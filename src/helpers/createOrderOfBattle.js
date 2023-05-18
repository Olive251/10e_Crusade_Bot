const {OOB} = require ('../data/schemas.js');

module.exports = async (oobName, guildId, userId) => {

    //TODO
    //Confirm OOB with same name doesn't already exist for user
    
    let newOob = new OOB({
        name: oobName,
        units: [],
        tally: {w: 0, l: 0},
        guildID: guildId,
        userID: userId,
    })

    try{
        await newOob.save();
        return true;
    } catch (err) {
        console.log(`Error creating Order of Battle\n${err}`);
        return false;
    }
    
}
