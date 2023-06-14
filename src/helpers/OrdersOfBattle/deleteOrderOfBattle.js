const {OOB} = require ('../../data/schemas.js');

module.exports = async (oobName, userId) => {
    try{

        let oobCheck = await OOB.findOne({name: oobName, userID: userId});
        if (!oobCheck){
            return false;
        }

        await OOB.findByIdAndDelete(oobCheck._id);
            
        oobCheck = await OOB.findOne({_id: oobCheck._id});

        if (oobCheck) return false
        else return true;

        
    }
    catch(err) {
        console.log(`Error deleting Order of Battle\n${err}`);
    }
}