const {OOB} = require ('../../../data/schemas.js');

module.exports = async (oobId, unitId, ptsUpdate) => {
    try{
        let oob = await OOB.findById(oobId);
        var unit;
        for (let u of oob.units){
            if (u._id == unitId){
                let oldPts = u.pointsValue;
                u.pointsValue = ptsUpdate;
                let ptsDif = ptsUpdate - oldPts;
                u.crusadePoints += ptsDif;

                unit = u;
            }
        }

        await OOB.findOneAndUpdate({_id: oobId}, {units: oob.units});
        return {r: true, u: unit};

    }
    catch (err){
        console.log(err);
        return {r: false, e: err};
    }
}