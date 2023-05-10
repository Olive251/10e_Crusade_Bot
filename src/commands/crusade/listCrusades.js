const {SlashCommandBuilder} = require('discord.js');
const {Crusade} = require('../../data/schemas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list-crusades')
        .setDescription(`Generate a report display the server's crusades`),
    run: async ({interaction}) => {
        await interaction.deferReply();
        try{
            let crusades = await Crusade.find({guildID: interaction.guildId});
            let message = '';
            for (const crusade of crusades){
                message += `🔸 ${crusade.name}\n`;
            }
            if (message.length > 0) 
                interaction.editReply(message);
            else
                interaction.editReply(`❗ There are no active crusades for this server`)

        } catch (err){
            console.log(`Error in listCrusades`);
            interaction.editReply(`It appears there are no active crusades for this server`);
        }
    }
}