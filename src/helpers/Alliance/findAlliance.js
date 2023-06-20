const {Crusade} = require('../../data/schemas');

module.exports = async( crusadeId, allianceId ) => {

    try {
        let crusade = await Crusade.findOne({_id: crusadeId});
        var alliance;
        for (const al of crusade.alliances){
            if (al._id == allianceId){
                alliance = al;
            }
        }
        return alliance;
    }
    catch (err) {
        console.log(`Error in findAlliance\n${err}`);
        return false;
    }
}