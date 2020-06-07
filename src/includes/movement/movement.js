import { initialize_graph, find_path } from './adventure-finder' ;

const NODE_TREES = {};

const GET_CURRENT_NODE_TREE = () => {

    if (character.map in NODE_TREES){
        return NODE_TREES[character.map];
    }else{
        NODE_TREES[character.map] = initialize_graph(character.map);
        return NODE_TREES[character.map];
    }
}


var path_checklist = null;
var failures = 0;
var move_failures = 0;
var unstuck_failures = 0;
var move_index = 0;

export function CALCULATE_MOVEMENT(x,y){

    log("Looking for path");
    var path = get_path(x,y);
    
    if(path.length == 0){
        log("No result found.");
        //no result, try smart move
        console.log(path);
        smart_move(x, y);

    }else if(path.length == 1){
        log("Only one result, just moving there.");
        //1 result, just go there.
        draw_line(character.x, character.y,path[0].x,path[0].y, 1, 0x0033FF);
        move(path[0].x, path[0].y);
    }else{
        log("Creating checklist.");
        path_checklist = create_path_checklist(path);

        render_path(path_checklist);        
        move_index = 0;
        failures = 0;
    }
}

export function TRAVERSE(){

    console.log(path_checklist);
    if(path_checklist == null) return true;
    
    //find next distination in list we have reached desired location
    var i;
    for (i = 0; i < path_checklist.length; i++) {
        if(path_checklist[i].visited == false){
            move_index = i;
            log('Next target ' + path_checklist[move_index].x + ',' + path_checklist[move_index].y + '.');
            break;
        }
    } 

    console.log(path_checklist[move_index]);

    //are we there yet
    if(path_checklist[move_index].x == character.real_x && path_checklist[move_index].y == character.real_y){
        path_checklist[move_index].visited = true;
        move_failures = 0;
        log('Target ' + path_checklist[move_index].x + ',' + path_checklist[move_index].y + ' reached.');

        move_index++;

        if(typeof path_checklist[move_index] === 'undefined'){
            log("End of path.");
            move_index = 0;
            return true;
        }else{
            log('Next target ' + path_checklist[move_index].x + ',' + path_checklist[move_index].y + '.');
        }
    }else{
        //stoped mid path?
        log("Not there yet. I'm at: " + character.x + "," + character.y);
        move_failures++
    }

    console.log(path_checklist[move_index]);

    if(move_failures > 10){
        if(unstuck_failures > 10){
            //really stuck
            move_failures = 0;
            unstuck_failures = 0;
            smart_move(path_checklist[move_index].x, path_checklist[move_index].y);
        }else{
            //stuck?
            try_unstuck();
            move_failures = 0;
            unstuck_failures++;
        }
    }else{
        move(path_checklist[move_index].x, path_checklist[move_index].y);
        log("Moving " + move_index);
    }

    return false;
}

const get_path = (x,y) => {

    var source = get_source();
    var target = GET_CURRENT_NODE_TREE().get(x,y);

    console.log(source);
    console.log(target);

    try{
        return find_path(source, target);
    }catch(err){
        move(source.x,source.y);
        log("Looking for path again");
        var path = get_path(x,y);
    }
    
}

const get_source = () => {

    var source = GET_CURRENT_NODE_TREE().get(character.x, character.y);

    console.log(source);

    if(source == null){
        if (is_moving(character)){
            return get_source();
        }else{
            try_unstuck();
            return get_source();
        };
    }else{
        return source;
    }

}

const create_path_checklist = (path) => {

    var path_checklist = [];

    path.forEach((node) => {
        path_checklist.push({x: node.x, y: node.y, visited: false});
    });

    return path_checklist;
}

async function try_unstuck(){

    log("Trying unstuck.");
    var jitter_x = character.x + ((Math.floor(Math.random() * 100) + 1) - 50);
    var jitter_y = character.y + ((Math.floor(Math.random() * 100) + 1) - 50);

    draw_line(character.x,character.y,jitter_x,jitter_y, 1, 0xFF0000);

    await move(jitter_x, jitter_y);

}
const render_path = (path) => {
    log("Drawing path checklist.");
    draw_line(character.x, character.y,path[0].x,path[0].y, 1, 0x0033FF);
    var i;
    for (i = 0; i < path.length - 1; i++) {
        draw_line(path[i].x,path[i].y,path[i+1].x,path[i+1].y, 1, 0x0033FF);
    } 
}

/*
function draw_all_quads(node){

    if(node.quads != null){

        node.quads.forEach((quad) => {

            setTimeout(() => draw_all_quads(quad), 100);

            if(quad.is_leaf == true && quad.crossable == true){
                quad.get_neighbors().forEach((neighbor) => {
                    console.log("Drawing line")
                    draw_line(quad.x,quad.y,neighbor.x,neighbor.y, 1, 0x0033FF);
                });
            }
        });

    }else{
        return;
    }
}*/

//draw_all_quads(sams_node_tree);