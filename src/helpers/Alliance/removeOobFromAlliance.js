const {Crusade, OOB} = require('../../data/schemas');

module.exports = async (oobId, allianceId, crusadeId) =>{
    var oobName;
    try{
        let oob = await OOB.findOne({_id:oobId});
        let crusade = await Crusade.findOne({_id: crusadeId});
        oobName = oob.name;
        var alName;
        
        //update crusade.alliance
        var updatedAlliances = [];
        for (al of crusade.alliances){
            if (al._id == allianceId){
                al.forces = al.forces.filter(force => `${force._id}` == `${oobId}`);
                updatedAlliances.push(al);
                alName = al.name;
            }
            else {
                updatedAlliances.push(al);
            }
        }
        await Crusade.findOneAndUpdate({_id: crusadeId}, {alliances: updatedAlliances});

        //update oob
        await OOB.findOneAndUpdate({_id: oobId}, {allianceMembership: null})

        if (alName.includes('alliance') || alName.includes('Alliance')){
            return {result: true, msg: `${oob.name} has left the ${alName} of the ${crusade.name}`}
        }
        return {result: true, msg: `${oob.name} has left the ${alName} alliance of the ${crusade.name}`};

    }
    catch (err){
        console.log(`Error in removeOobFromAlliance\n${err}`);
        return ({result: false, msg:`++There was a problem communing with the machine sprits. ${oobName} may not have been removed from the ${alName}++`});
    }
}