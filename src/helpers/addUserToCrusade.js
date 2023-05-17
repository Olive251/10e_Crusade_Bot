const {Crusade} = require('../data/schemas.js');

module.exports = async (crusade, userId) => {
    
    console.log(userId)
    crusade.players.push(userId);

    try {
        await Crusade.updateOne({_id: crusade._id}, {players: crusade.players});
    } catch (err){
        console.log(`Error adding user to crusade:\n${err}`);
    }

    crusade = await Crusade.findOne({_id: crusade._id});
    return crusade.players.includes(userId);
}