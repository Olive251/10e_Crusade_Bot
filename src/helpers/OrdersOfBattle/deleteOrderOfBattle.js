const {Crusade, OOB} = require ('../../data/schemas.js');
const removeOobFromAlliance = require('../Alliance/removeOobFromAlliance.js');

module.exports = async (oobName, userId, guildId) => {
    try{

        let oobCheck = await OOB.findOne({name: oobName, userID: userId});
        if (!oobCheck){
            return false;
        }

        if (oobCheck.allianceMembership){

            //find and update alliance
            let crusades = await Crusade.find({guildID: guildId});
            var allianceId = oobCheck.allianceMembership;
            var crusadeId;

            for (let crusade of crusades){
                for (let alliance of crusade.alliances){
                    if (alliance._id == allianceId){
                        crusadeId = crusade._id;
                    }
                }
            }
            let result = await removeOobFromAlliance(oobCheck._id, allianceId, crusadeId);
        }

        await OOB.findByIdAndDelete(oobCheck._id);
            
        let oobCheck2 = await OOB.findOne({_id: oobCheck._id});
        if (oobCheck2 != null) return false;
        return true;

    }
    catch(err) {
        console.log(`Error deleting Order of Battle\n${err}`);
    }
}