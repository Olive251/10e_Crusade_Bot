const { Unit, OOB} = require ('../../../data/schemas.js');

module.exports = async (oobId, unitId, killDif) => {

    try{
        let oob = await OOB.findOne({_id: oobId});
        for (let u of oob.units){
            if (u._id == unitId){
                u.killCount += killDif;
            }
        }

        await OOB.findOneAndUpdate({_id: oobId}, oob);

        var unit;
        for (let u of oob.units){
            if (u._id == unitId){
                unit = u;
            }
        }

        return {r: true, u: unit};
    }
    catch(err){
        console.log(err);

        return {r: false, u: null};
    }
}