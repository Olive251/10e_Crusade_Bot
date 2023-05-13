const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const {Crusade} = require('../../data/schemas');
const isUserInCrusade = require ('../../helpers/isUserInCrusade.js')

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

            //Check that crusade was correctly acquired
            if (!crusade){
                interaction.editReply(`❗ - Unable to find "${interaction.options.get('name').value}" among this server's crusades`);
                return;
            }
            
            //embed basics
            const embed = new EmbedBuilder()
                .setTitle(crusade.name)
                .setDescription(crusade.description || `description`)
                .setColor('Random')
            
            //List players in the campaign
            // TODO: update to show username
            // probably best to make a helper for this
            if (crusade.players.length > 0){
                embed.addFields(
                    {name: 'Players', value: `${crusade.players}`}
                );
            }
            else {
                embed.addFields(
                    {name: 'Players', value: 'No registered players'}
                )
            }
            
            //Show alliances
            if (crusade.alliances.length > 0){
                embed.addFields(
                    {name: 'Alliances', value: `${crusade.alliances}`}
                )
            } else {
                embed.addFields(
                    {name: 'Alliances', value: 'No registered alliances'}
                )
            }
            
            // link to crusade doc
            if (crusade.externalCrusadeDoc){
                embed.addFields(
                    {name: 'Crusade Document', value: `${crusade.externalCrusadeDoc}`}
                )
            }
            else {
                embed.addFields(
                    {name: 'Crusade Document', value: 'No document has been linked'}
                )
            }
            const optRow = new ActionRowBuilder()
            // TODO
            // buttons to join/leave
            if (!isUserInCrusade(crusade, interaction.user)){
                optRow.addComponents(
                    new ButtonBuilder()
                    .setLabel('Join Crusade')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId('join_crusade')
                )
            }
            else{
                optRow.addComponents(
                    new ButtonBuilder()
                    .setLabel('Leave Crusade')
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId('leave_crusade')
                )
            }

            // TODO
            // add functionality to create & add a new alliance to the crusade

            
            
            

            interaction.editReply({embeds: [embed], components: [optRow]});

        } catch (err){
            console.log(`ERROR: crusade-info\n  ${err}`);
            interaction.editReply(`++A problem occurred while communing with the machine spirits++`);
        }
    }
}