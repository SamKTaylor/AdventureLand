/* REQUIRED CONSTANTS 


*/

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