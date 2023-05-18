const {Crusade} = require('../data/schemas.js');

module.exports = async (crusadeId, allianceId) => {
    var crusade;

    try{
        crusade = await Crusade.findOne({_id: crusadeId});

        for (i = 0; i < crusade.alliances.length; i++){
            if (`${crusade.alliances[i]._id}` === `${allianceId}`){
                if(crusade.alliances.length > 1){
                    let updateAlliances = crusade.alliances.filter(alliance => `${alliance._id}` != `${allianceId}`);
                    await Crusade.updateOne({_id: crusade._id}, {alliances: updateAlliances});
                }
                else {
                    await Crusade.updateOne({_id: crusade._id}, {alliances: []});
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        return false;
    }

    crusade = await Crusade.findOne({_id: crusade._id});
    for (alliance of crusade.alliances){
        if (`${alliance._id}` === `${allianceId}`){
            return false;
        }
    }
    return true;
}