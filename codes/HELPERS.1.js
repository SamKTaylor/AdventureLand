/* REQUIRED CONSTANTS 


*/

const moveTo = (x, y) => {

    draw_line(x,y,character.x,character.y);

    if(distanceFrom(x,y) > SMART_MOVE_DISTANCE){

        send_cm_party({action:"smart_move", x: x, y: y});
        smart_move({x: x, y: y});

    }else{
        move(x,y);
    }
}

const distanceFrom = (x, y) => {
    return Math.abs(Math.sqrt(
        Math.pow(x - character.real_x, 2) + Math.pow(y - character.real_y, 2)
    ));
};

//Return array containing names of all party members
const getPartyNameArray = () => {

    var array = [];

    for (name in parent.party) {
        array.push(name);
    }

    return array;
}

//Return array containing names of all other party members
const getOtherPartyNameArray = () => {

    var array = [];

    for (name in parent.party) {
        if (name != character.name) {
            array.push(name);
        }
    }

    return array;
}

//send a message to everyone in the party
const send_cm_party = (message) => {

    for (name in parent.party) {
        if (name != character.name) {
            log("Messaging " + name);
            send_cm(name, message);
        }
    }
    
}