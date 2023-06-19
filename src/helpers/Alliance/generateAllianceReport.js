const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle}  = require ('discord.js');
const {Alliance, OOB, Crusade} = require('../../data/schemas');

exports.module = (interaction, alliance, crusadeId, buttonsOn=true) => {

    let winCt = 0;
    let lossCt = 0;

    try {
        const embed = EmbedBuilder()
        .setTitle(alliance.name)
        .setColor('Random');

        let pCrusdae = Crusade.findOne({_id: crusadeId});
        embed.setDescription(`*Alliance in the ${pCrusade.name}*`);
        
        let forcesStr = '';
        let players = [];
        for (const oobId of alliance.forces){
            let oob = OOB.findOne({_id: oobId});

            if (!oob) throw('Failed to get Order of Battle from DB');

            winCt += oob.tally.w;
            lossCt += oob.tall.l;
            players.push(oob.userID);

            forcesStr += `- ${oob.name} -- W:${oob.tally.w} L:${oob.tally.l}\n`;
        }

        embed.addFields(
            {name: 'Forces Involved:', value: forcesStr},
            {name: 'Total Victories/Defeats', value: `W:${winCt} L:${lossCt}`},
        );

        //buttons
        if (buttonsOn){
            const optRow = new ActionRowBuilder();

            if (!players.includes(interaction.user)){
                optRow.addComponents()
                .setLabel(`Join Alliance`)
                .setStyle(ButtonStyle.Primary)
                .setCustomId(`join_alliance_${crusadeId}_${alliance._id}`)

            }
            else {
                optRow.addComponents()
                .setLabel(`Removed Order`)
                .setStyle(ButtonStyle.Danger)
                .setCustomId(`leave_alliance_${crusadeId}_${alliance._id}`)
            }

            interaction.reply({embeds:[embed], components: [optRow]})
            return;
        } else {
            interaction.reply({embed: [embed]});
        }

    }
    catch (err) {
        console.log(`Error in generateAllianceReport:\n${err}`);
    }
}