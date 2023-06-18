const {Alliance} = require('../../data/schemas');

exports.module = async (oobId, alliance) => {

    alliance.forces.push(oobId);

    try{
        await Alliance.findOneAndUpdate({_id: alliance._id}, {forces: alliance.forces});

        return true;
    }
    catch (err) {
        console.log(`Error in addOobToAlliance:\n${err}`);
        return false;
    }

}