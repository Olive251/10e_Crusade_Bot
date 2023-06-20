const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle}  = require ('discord.js');
const {Alliance, OOB, Crusade} = require('../../data/schemas');

module.exports = async (interaction, allianceId, crusadeId, buttonsOn=true) => {

    let winCt = 0;
    let lossCt = 0;
    console.log(allianceId);

    try {
        // let alliance = await Alliance.findOne({_id: allianceId});
        // if(!alliance) throw(`Unable to get alliance from DB`);

        let pCrusade = await Crusade.findOne({_id: crusadeId});
        var alliance;
        for (al of pCrusade.alliances){
            if (al._id == allianceId){
                alliance = al;
            }
        }

        const embed = new EmbedBuilder()
        .setTitle(alliance.name)
        .setColor('Random');

        embed.setDescription(`*Alliance in the ${pCrusade.name}*`);
        
        let forcesStr = '';
        let players = [];
        
        if (alliance.forces && alliance.forces.length >= 1){
            for (const oobId of alliance.forces){
            
                let oob = OOB.findOne({_id: oobId});
    
                if (!oob) throw('Failed to get Order of Battle from DB');
    
                winCt += oob.tally.w;
                lossCt += oob.tall.l;
                players.push(oob.userID);
    
                forcesStr += `- ${oob.name} -- W:${oob.tally.w} L:${oob.tally.l}\n`;
            }
        }

        if (forcesStr.length > 0){
            embed.addFields(
            {name: 'Forces Involved:', value: forcesStr, inline: true},
            {name: 'Total Victories/Defeats', value: `W:${winCt} L:${lossCt}`, inline:true},
            )
        ;}
        else {
            embed.addFields(
                {name: 'Forces Involved', value: '*No forces involved yet...*', inline: true},
                {name: 'Total Victories/Defeats', value: `W:${winCt} L:${lossCt}`, inline: true},
            )
        }

        //buttons
        if (buttonsOn){
            const optRow = new ActionRowBuilder();

            if (!players.includes(interaction.user)){
                optRow.addComponents(
                    new ButtonBuilder()
                    .setLabel(`Join Alliance`)
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId(`join-alliance_${crusadeId}_${alliance._id}`)
                )
            }
            else {

                optRow.addComponents(
                    new ButtonBuilder()
                    .setLabel(`Leave Alliance`)
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId(`leave-alliance_${crusadeId}_${alliance._id}`)
                )
            }

            interaction.reply({embeds:[embed], components: [optRow], ephemeral:true})
            return;
        } else {
            interaction.reply({embed: [embed]});
            return;
        }

    }
    catch (err) {
        console.log(`Error in generateAllianceReport:\n${err}`);
        interaction.reply(`++There was a problem communing with the machine spirits++`);
        return;
    }
}