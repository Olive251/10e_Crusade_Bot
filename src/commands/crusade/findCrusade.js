const {SlashCommandBuilder} = require('discord.js');
const {Crusade} = require('../../data/schemas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crusade-info')
        .setDescription(`'Generate a report on a specific campaign`)
        .addStringOption(option => 
            option.setName('name')
            .setRequired(true)
            .setDescription('Name of the crusade you wish to view')
            ),
    run: async ({interaction}) => {
        await interaction.deferReply();
        try{
            let crusade = await Crusade.findOne({name: interaction.options.get('name').value, guildID: interaction.guildId});
            if (!crusade){
                interaction.editReply(`❗ Unable to find "${interaction.options.get('name').value}" among this server's crusades`);
            }
            interaction.editReply(`${crusade.name}`);

        } catch (err){
            console.log(`ERROR: crusade-info\n  ${err}`);
        }
    }
}