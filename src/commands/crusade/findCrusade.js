const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const {Crusade} = require('../../data/schemas');
const generateCrusadeReport = require('../../helpers/generateCrusadeReport')

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
        try{
            let crusade = await Crusade.findOne({name: interaction.options.get('name').value, guildID: interaction.guildId});

            generateCrusadeReport(interaction, crusade);

        } catch (err){
            console.log(`ERROR: crusade-info\n  ${err}`);
        }
    }
}