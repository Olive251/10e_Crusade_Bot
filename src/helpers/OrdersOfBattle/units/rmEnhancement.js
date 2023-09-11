const {OOB} = require ('../../../data/schemas.js');

module.exports = async (oobId, unitId) => {
    try{
        let oob = await OOB.findOne({_id: oobId});
        var unit;
        //find unit
        for (let u of oob.units){
            if (u._id == unitId){
                let epv = u.enhancement.pointsValue;
                u.enhancement = {name: 'none', pointsValue: 0};
                u.crusadePoints -= epv;
                unit = u;
                break;
            }
        }
        await oob.save();
        return {r: true, u: unit};
    }
    catch (err){
        return {r: false, e: err};
    }
}