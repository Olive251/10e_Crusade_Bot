const {Crusade, OOB} = require('../../data/schemas');

module.exports = async (oobId, allianceId, crusadeId) => {

    try{
        let crusade = await Crusade.findOne({_id: crusadeId});
        var alName;
        for (const a of crusade.alliances){
            if (a._id == allianceId){
                a.forces.push(oobId);
                alName = a.name;
            }
        }
        
        let oob = await OOB.findOneAndUpdate({_id: oobId}, {allianceMembership: allianceId}, {new: true});

        await Crusade.findOneAndUpdate({_id: crusadeId}, {alliances: crusade.alliances});

        if (alName.includes('alliance') || alName.includes('Alliance')){
            return {result: true, msg: `${oob.name} has joined the ${alName} of the ${crusade.name}`}
        }
        return {result: true, msg: `${oob.name} has joined the ${alName} alliance of the ${crusade.name}`};
   }
    catch (err) {
        console.log(`Error in addOobToAlliance:\n${err}`);
        return false;
    }

}