const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle}  = require ('discord.js');
const isUserInCrusade = require('./isUserInCrusade.js');
const getUserInfo = require('./getUserInfo.js');

module.exports = async (interaction, crusade, ephemeral = true) => {
    await interaction.deferReply({ephemeral: ephemeral});

    if (!crusade){
        interaction.editReply(`❗ - Unable to find "${interaction.options.get('name').value}" among this server's crusades`);
        return;
    }

    try  {  //embed basics
        const embed = new EmbedBuilder()
        .setTitle(crusade.name)
        .setDescription(crusade.description || `description`)
        .setColor('Random')
            
        //List players in the campaign
        if (crusade.players.length > 0){
            let playerNames = '';
            for (const userId of crusade.players){
                let user = await getUserInfo(userId, interaction.guild);
                playerNames += `- ${user.user.username}\n`

            }
            embed.addFields(
                {name: 'Players', value: playerNames}
            );
        }
        else {
            embed.addFields(
                {name: 'Players', value: 'No registered players'}
            )
        }
        
        //Show alliances
        //puts the alliances in a string for readability in embed
        if (crusade.alliances.length > 0){
            let alliances = '';
            for (const alliance of crusade.alliances){
                alliances += `- ${alliance.name}\n`
            }
            embed.addFields(
                {name: 'Alliances', value: alliances}
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
        
        // buttons to join/leave
        if (ephemeral){

            const optRow = new ActionRowBuilder()

            if (!isUserInCrusade(crusade, interaction.user)){
                optRow.addComponents(
                    new ButtonBuilder()
                    .setLabel('Join Crusade')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId(`join_crusade_${crusade._id}`)
                )
            }
            else{
                optRow.addComponents(
                    new ButtonBuilder()
                    .setLabel('Leave Crusade')
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId(`leave_crusade_${crusade._id}`)
                )
            }

            if (crusade.alliances.length < 5){
                optRow.addComponents(
                    new ButtonBuilder()
                    .setLabel('Add Alliance')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId(`add_alliance_${crusade._id}`)
                )
            }
            
            let allianceRow = new ActionRowBuilder();
            for (const alliance of crusade.alliances){
                allianceRow.addComponents(
                    new ButtonBuilder()
                    .setLabel(`👁‍🗨 ${alliance.name}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId(`view-alliance_${alliance._id}_${crusade._id}`)
                )
            }


            interaction.editReply({embeds: [embed], components: [allianceRow,optRow]});
        }

        interaction.editReply({embeds: [embed]});

    } catch (err) {
        console.log(`ERROR: crusade-info\n  ${err}`);
        interaction.editReply(`++A problem occurred while communing with the machine spirits++`);
    }
}