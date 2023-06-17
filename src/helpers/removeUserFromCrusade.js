const {Crusade} = require('../data/schemas.js');

module.exports = async (crusade, userId) => {

    for (i = 0; i < crusade.players.length; i++){

        if (crusade.players[i] == userId){
            crusade.players[i] = null;
    
            if (crusade.players.length >= 1){
                crusade.players.splice(i, i-1);
                await Crusade.updateOne({_id: crusade._id}, {players: crusade.players});
            }
            else {
                await Crusade.updateOne({_id: crusade._id}, {players: []});
            }
    
            return true;
        }

    }

    //if user is not found and removed, return false
    return false;
}