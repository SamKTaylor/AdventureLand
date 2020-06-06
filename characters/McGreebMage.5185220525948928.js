require_code("PATH_FINDER");

const TEST_LOCATIONS = [
    {"x": 614,"y": 663,"map": "main", name: "mansion enterance"},
    {"x": 108,"y": 793,"map": "main", name: "spawn"},
    {"x": 0,"y": 0,"map": "main", name: "town"},
    {"x": -1195,"y": -156,"map": "main", name: "crabs"},
    {"x": 476,"y": 1927,"map": "main", name: "armadillos"},
    {"x": -850,"y": 1880,"map": "main", name: "huge crabs"},
    {"x": -1499,"y": 585,"map": "main", name: "pier"},
    //{"x": 1381,"y": 160,"map": "main", name: "cave of darkness entrance"},
    {"x": -705,"y": 1147,"map": "main", name: "pets"},
    {"x": -1195,"y": -156,"map": "main", name: "crabs2"},
    {"x": 614,"y": 663,"map": "main", name: "mansion enterance2"},
]

var state = "CalculateMovement"

setInterval(function () {
    //set_message(state);

    if (!is_on_cooldown("regen_hp") && character.hp < character.max_hp - 100) {
        use_skill("regen_hp");
    }

    if (is_moving(character)) return;

    switch(state) {
        case "Traverse":
            TRAVERSE("CalculateMovement");
            break;
        case "Town":
            if(character.real_x > TOWN.min_x && character.real_x < TOWN.max_x && character.real_y > TOWN.min_y && character.real_y < TOWN.max_y){
                state = "CalculateMovement";
                //set_message(state);
            }else{
                use_skill("use_town");
            }

            break;

        case "CalculateMovement":
            var test_location = Math.floor(Math.random() * 10);
            set_message(TEST_LOCATIONS[test_location].name);
            CALCULATE_MOVEMENT(TEST_LOCATIONS[test_location].x, TEST_LOCATIONS[test_location].y);
            break;

        default:
          // code block
      } 


}, 1000 / 4); // Loops every 1/4 seconds.