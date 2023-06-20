const {OOB} = require ('../../data/schemas.js');
const addOobToAlliance = require('../Alliance/addOobToAlliance.js');

module.exports = async (oobName, guildId, userId, allianceId=null, crusadeId=null) => {

    //TODO
    //Confirm OOB with same name doesn't already exist for user
    
    let newOob = new OOB({
        name: oobName,
        units: [],
        tally: {w: 0, d: 0, l: 0},
        guildID: guildId,
        userID: userId,
        requisitionPoints: 5,
        maxSize: 1000,
    })
    if (allianceId && crusadeId){
        newOob.allianceMembership = allianceId;
    }

    try{

        var oobCheck;
        try{
            oobCheck = await OOB.findOne({name: oobName, userID: userId});
        }
        catch (err){
            console.log(`Error in create OoB\n${err}`);
        }

        if(oobCheck){
            console.log('OOB with this name already registered to user');
            return false;
        }

        newOob = await newOob.save();
        if (allianceId && crusadeId){
            let result = await addOobToAlliance(newOob._id, allianceId, crusadeId);
            return result;
        }
        return true;
    } catch (err) {
        console.log(`Error creating Order of Battle\n${err}`);
        return false;
    }
    
}
