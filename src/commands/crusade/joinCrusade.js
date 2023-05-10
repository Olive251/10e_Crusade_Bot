const {SlashCommandBuilder} = require('discord.js');
const {Crusade} = require('../../data/schemas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join-crusade')
        .setDescription(`Join one of the crusades available on your server`)
        .addStringOption(option =>
            option.setName('crusade-name')
                .setDescription(`The name of the crusade you wish to join`)),
    run: async ({interaction}) => {
        
    }
            
}