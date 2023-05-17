const {Crusade} = require('../data/schemas.js');

module.exports = async (crusade, userId) => {
        
    crusade.players.push(userId);
    //implement functionality to handle if no players are currently in crusade
    try {
        await Crusade.updateOne({_id: crusade._id}, {players: crusade.players});
    } catch (err){
        console.log(`Error adding user to crusade:\n${err}`);
    }

    if (crusade.players.includes(userId)){
        return true;
    } else return false;
}