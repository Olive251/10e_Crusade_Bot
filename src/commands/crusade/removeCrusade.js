const {SlashCommandBuilder} = require('discord.js');
const {Crusade} = require('../../data/schemas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-crusade')
        .setDescription('Remove a crusade from your server')
        .addStringOption(option => 
            option.setName('name')
                .setRequired(true)
                .setDescription('The name of the crusade you wish to remove')
            ),
    run: async ({interaction}) => {
        try{
            await Crusade.deleteOne({name: interaction.options.get('name').value, guildID: interaction.guildId})

            if (!await Crusade.findOne({name: interaction.options.get('name').value, guildID: interaction.guildId})){
                interaction.reply('✅ Crusade successfully removed!');
            } else {
                interaction.reply(`❗ There was a problem removing the crusade`)
            }
        } catch (err){
            console.log(`Unable to remove crusade:\n ${err}`);
            interaction.reply(`❗ There was a problem removing the crusade`);
        }
    }
}