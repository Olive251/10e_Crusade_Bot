const {Crusade, OOB} = require('discord.js');

module.exports = async (oobId, allianceId, crusadeId) =>{

    try{
        let oob = await OOB.findOne({_id:oobId});
        let crusade = await Crusade.findOne({_id: crusadeId});
        
        for (al of crusade.alliances){
            if (al._id == allianceId){
                al.forces.filter(force => `${force._id}` == `${oobId}`);
            }
        }


    }
    catch (err){
        console.log(`Error in removeOobFromAlliance\n${err}`);
    }
}