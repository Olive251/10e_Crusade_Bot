const {OOB} = require ('../../../data/schemas.js');


module.exports = async (oobId, unitId, enhancement) => {
    try{
        let oob = await OOB.findById(oobId);
        var unit;
        for (let u of oob.units){
            if (u._id == unitId){
                u.enhancement = enhancement;
                u.crusadePoints += u.enhancement.pointsValue;
                unit = u;
            }
        }

        await OOB.findOneAndUpdate({_id: oobId}, oob);
        return {r: true, u: unit};

    }
    catch (err){
        console.log(err);
        return {r: false, e: err};
    }
}