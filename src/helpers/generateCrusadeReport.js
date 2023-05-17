const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle}  = require ('discord.js');
const isUserInCrusade = require('./isUserInCrusade.js');
const getUserInfo = require('./getUserInfo.js');

module.exports = async (interaction, crusade) => {
    await interaction.deferReply();

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
            let playerNames = [];
            for (userId of crusade.players){
                let user = await getUserInfo(userId, interaction.guild);
                playerNames.push(user.username)

            }
            embed.addFields(
                {name: 'Players', value: `${playerNames}`}
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
            for (alliance of crusade.alliances){
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
        const optRow = new ActionRowBuilder()
        
        // buttons to join/leave
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

        optRow.addComponents(
            new ButtonBuilder()
            .setLabel('Add Alliance')
            .setStyle(ButtonStyle.Primary)
            .setCustomId(`add_alliance_${crusade._id}`)
        )

        interaction.editReply({embeds: [embed], components: [optRow]});

    } catch (err) {
        console.log(`ERROR: crusade-info\n  ${err}`);
        interaction.editReply(`++A problem occurred while communing with the machine spirits++`);
    }
}