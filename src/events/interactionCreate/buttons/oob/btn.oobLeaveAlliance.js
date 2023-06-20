const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const removeOobFromAlliance = require('../../../../helpers/Alliance/removeOobFromAlliance');
const {OOB} = require('../../../../data/schemas')

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.includes('remove-order_')) return;

    let cId = interaction.customId.split('_');

    //get oobs assigned to alliance
    var oobs;
    try{
        oobs = await OOB.find({userID: interaction.user, allianceMembership: cId[2]})
    }catch (err){
        console.log(`Error gettings oobs from DB\n${err}`);
    }

    //Respond with a select menu of oob options
    let slct = new StringSelectMenuBuilder()
    .setCustomId('oob-rm-select')
    if (oobs.length < 1){
        slct.addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel(`You have no free orders of battle...`)
            .setValue(`leave-alliance_noObb`)
        )
    }
    else {
        for (const oob of oobs){
            slct.addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel(`${oob.name}`)
                .setValue(`leave-alliance_${oob._id}_${cId[2]}_${cId[1]}`) //leave-alliance_oobId_allianceId_crusadeId
            )
        }
    }

    let slRow = new ActionRowBuilder()
    .addComponents(slct);

    await interaction.reply({content: '`Select order of battle to remove:`', components: [slRow], ephemeral: true});

}