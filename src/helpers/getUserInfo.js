const {} = require('discord.js');

module.exports = async (userId, guild) => {
    var member;
    try{
        member = await guild.members.fetch(`${userId}`);
    } catch (err){
        console.log(err);
    }

    return member.user;
}