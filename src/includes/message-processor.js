/* REQUIRED CONSTANTS 

const TARGET_CALLER = "McGreebTanks";

*/

const processMessage = (from, message) => {

    log("Processing Message.")

    if(from == TARGET_CALLER){
        switch (message.action) {
            case "smart_move":
                smart_move({x: message.x, y: message.y});
                break;
            case "attack_this":
                //TODO

                break;
            default:
                //unknown message
        }
    }

}