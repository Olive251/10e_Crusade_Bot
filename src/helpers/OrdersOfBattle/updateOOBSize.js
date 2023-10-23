const {OOB} = require('../../data/schemas');

//rpChange: int
module.exports = async (oobId, newSize) => {

    try{
        let oob = await OOB.findOneAndUpdate({_id: oobId}, {maxSize: newSize}, {new: true});
        if (!oob) throw('Problem getting OoB from server');
        
        return {r: true, o: {name: oob.name, size: oob.maxSize}};
    }
    catch (err) {
        console.log(`error in modifyRP:\n${err}`);
        return {r: false, oob: null};
    }
}