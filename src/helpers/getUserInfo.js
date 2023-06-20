const {} = require('discord.js');

module.exports = async (userId, guild) => {
    var member;
    try{
        member = await guild.members.fetch(`${userId}`);
        return member;
    } catch (err){
        console.log(err);
        return false;
    }

    
}