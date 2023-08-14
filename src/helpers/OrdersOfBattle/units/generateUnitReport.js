const {Unit, OOB} = require('../../../data/schemas')
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')

module.exports = async (interaction, unitId, oobId) => {

    await interaction.deferReply({ephemeral: true});

    var oob;
    var unit;

    try{
        //get oob and unit
        oob = await OOB.findOne({_id: oobId});

        for (u of oob.units){
            if (u._id == unitId){
                unit = u;
            }
        }
    }
    catch (err){
        console.log(`Error in generateUnitReport\n${err}`);
        interaction.editReply(`++There was a problem communing with the machine spirits++`);
        return;
    }

    const embed = new EmbedBuilder()
    .setTitle(unit.name)
    .setColor(`Random`)
    .addFields(
        {name: `Unit Type`, value: `${unit.type}`, inline: true},
        {name: `Base Points Value`, value: `${unit.pointsValue}`, inline: true},
        {name: `Rank`, value: `${u.rank}`, inline: false},
        {name: `Experience Points`, value: `${unit.xp}`, inline: true},
        {name: `Crusade Points`, value: `${unit.crusadePoints}`,inline: true},
        {name: `Kill Count`, value: `${unit.killCount}`, inline: false},
    )

    const ar = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel(`Update Exp`)
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`update-exp_${unitId}_${oobId}`),
        new ButtonBuilder()
        .setLabel(`Update Points`)
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`update-points_${unitId}_${oobId}`),
        new ButtonBuilder()
        .setLabel(`Update Kills`)
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`update-kills_${unitId}_${oobId}`),
    )

    const ar2 = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel(`+1 Kill`)
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`+1-kill_${unitId}_${oobId}`),
        new ButtonBuilder()
        .setLabel(`-1 Kill`)
        .setStyle(ButtonStyle.Danger)
        .setCustomId(`-1-kill_${unitId}_${oobId}`),
    )



    interaction.editReply({embeds: [embed], components: [ar, ar2]});
}