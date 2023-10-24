const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle}  = require ('discord.js');
const {Alliance, OOB, Crusade} = require('../../data/schemas');
const getUserInfo = require('../getUserInfo');

module.exports = async (interaction, allianceId, crusadeId, buttonsOn=true) => {

    let winCt = 0;
    let lossCt = 0;

    try {

        let pCrusade = await Crusade.findOne({_id: crusadeId});
        var alliance;
        for (al of pCrusade.alliances){
            if (al._id == allianceId){
                alliance = al;
            }
        }

        const embed = new EmbedBuilder()
        .setTitle(alliance.name)
        .setColor('Random')
        .setDescription(`*Alliance in the ${pCrusade.name}*`);
        
        let forcesStr = '';
        let players = [];
        
        if (alliance.forces && alliance.forces.length >= 1){
            for (const oobId of alliance.forces){
            
                let oob = await OOB.findOne({_id: oobId});
    
                if (!oob){
                    forcesStr += `- *error retreiving OoB {id: ${oobId}} from databse*\n`
                }
                else {
                    winCt += oob.tally.w;
                    lossCt += oob.tally.l;
    
                    let player = await getUserInfo(oob.userID, interaction.guild);
                    players.push(player.user.id);
        
                    forcesStr += `- ${oob.name}  |  W:${oob.tally.w} L:${oob.tally.l}  |  *@${player.nickname || player.user.username}*\n`;
                }
            }
        }

        if (forcesStr.length > 0){
            embed.addFields(
            {name: 'Total Victories/Defeats', value: `W:${winCt} L:${lossCt}`, inline:false},
            {name: 'Forces Involved:', value: forcesStr, inline: true},  
            )
        ;}
        else {
            embed.addFields(
                {name: 'Total Victories/Defeats', value: `W:${winCt} L:${lossCt}`, inline: true},
                {name: 'Forces Involved', value: '*No forces involved yet...*', inline: true},
            )
        }

        //buttons
        if (buttonsOn){
            const optRow = new ActionRowBuilder();

            let alreadyJoined = false;
            for (userId of players){

                iUser = `${interaction.user}`;
                iUser = iUser.substr(2, iUser.length-3);

                if (iUser == userId){
                    alreadyJoined = true;
                }
            }

            if (!alreadyJoined){
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
                    .setLabel(`Add Order`)
                    .setStyle(ButtonStyle.Success)
                    .setCustomId(`join-alliance_${crusadeId}_${alliance._id}`)
                )

                optRow.addComponents(
                    new ButtonBuilder()
                    .setLabel(`Remove Order`)
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId(`remove-order_${crusadeId}_${alliance._id}`)
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