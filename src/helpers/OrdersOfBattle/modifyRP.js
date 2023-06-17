const {OOB} = require('../../data/schemas');

//rpChange: int
module.exports = async (oobId, rpChange) => {

    try{
        let oob = await OOB.findOne({_id: oobId});
        if (!oob) throw('Problem getting OoB from server');

        oob.requisitionPoints += rpChange;
        console.log('' + oob.requisitionPoints);

        await OOB.findOneAndUpdate({_id: oobId}, {requisitionPoints: oob.requisitionPoints});
        
        return true;
    }
    catch (err) {
        console.log(`error in modifyRP:\n${err}`);
        return false;
    }
}