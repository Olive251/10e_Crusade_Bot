const {Crusade} = require('../data/schemas.js');

module.exports = async (crusade, userId) => {

    for (i = 0; i < crusade.players.length; i++){

        if (crusade.players[i] == userId){
            crusade.players[i] = null;
    
            if (crusade.players.length >= 1){
                crusade.players = crusade.players.filter((el) => el !== userId);

                let newPlayers = []
                for (const player of crusade.players){
                    if (player) newPlayers.push(player);
                }
                await Crusade.updateOne({_id: crusade._id}, {players: newPlayers});
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