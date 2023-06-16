const {OOB} = require('../../data/schemas');

module.exports = async (oobName, userId, guildId) => {

    try{

        let oob = await OOB.findOne({name: oobName, userID: userId, guildID: guildId});

        if (oob){
            return oob;
        } else return false;
    }
    catch (err){
        console.log(`Error in getOrderOfBattle\n${err}`);
        return false;
    }


}