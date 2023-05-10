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
        
        if (!interaction.options.get('crusade-name').value){
            interaction.reply(`Optionless version not yet implemented!`);
            return;
        }
        await interaction.deferReply();
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);

        let crusade = await Crusade.findOne({name: interaction.options.get('crusade-name').value, guildID: interaction.guildId});
        console.log(crusade);
        crusade.players.push(user.id);
        await Crusade.updateOne({_id:crusade._id}, {players: crusade.players});

        interaction.editReply(`You have sucessfully joined the ${crusade.name}!`);
    }
            
}