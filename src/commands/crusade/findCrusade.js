const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
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

            //Check that crusade was correctly acquired
            if (!crusade){
                interaction.editReply(`❗ Unable to find "${interaction.options.get('name').value}" among this server's crusades`);
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
            // TODO
            // add functionality to show alliances if there are any

            // TODO
            // add functionality to create add a new alliance to the crusade

            // TODO
            // link to crusade doc

            // TODO
            // buttons to join/leave

            console.log(crusade.name);
            interaction.editReply({embeds: [embed]});

        } catch (err){
            console.log(`ERROR: crusade-info\n  ${err}`);
            interaction.editReply(`++A problem occurred communing with the machine spirits++`);
        }
    }
}