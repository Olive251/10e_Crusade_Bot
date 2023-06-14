const {OOB} = require('../data/schemas.js');

//options 1=search by user, 2=search by crusade, 3=search by guild
module.exports = async (option, searchKey, guildId=null) => {
    switch(option){
        case 1: //user
            let oobs = await OOB.find({userID: searchKey, guildID: guildId})
            // for (oob of oobs) {
            //     console.log(oob.name);
            // }
            return oobs;
            break;
        case 2: //crusade
            break;
        case 3: //guild
            break;
    }
}