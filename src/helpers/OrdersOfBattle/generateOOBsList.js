const {OOB} = require('../../data/schemas');

//options 1=search by user, 2=search by crusade, 3=search by guild
module.exports = async (option, searchKey, guildId=null) => {
    switch(option){
        case 1: //user
            let oobs = await OOB.find({userID: searchKey, guildID: guildId})
            return oobs;
        case 2: //crusade
        //TODO: get list of all users in crusade, then get all oobs for each user
            break;
        case 3: //guild
        //TODO: get list of all users in guild, then get all oobs for each user
            break;
    }
}