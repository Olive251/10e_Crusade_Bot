const {OOB, Unit} = require('../../../data/schemas')

module.exports = async (oobId, unitId) => {

    try{
        let oob = await OOB.findOne({_id: oobId});

        // remove unit from oob
        oob.units = oob.units.filter(unit => unit._id != unitId);

        //update the oob in db
        oob.save();
        return {r: true};
    }
    catch(err){
        console.log(err);
        return {r: false, e: err};
    }

}