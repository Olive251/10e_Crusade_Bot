const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const removeOobFromAlliance = require('../../../../helpers/Alliance/removeOobFromAlliance');
const {OOB} = require('../../../../data/schemas')

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.includes('remove-order_')) return;

    let cId = interaction.customId.split('_');
    console.log(cId);

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
            .setValue(`join-alliance_noObb`)
        )
    }
    else {
        for (const oob of openOobs){
            slct.addOptions(
                new StringSelectMenuBuilder()
                .setLabel(`${oob.name}`)
                .setValue(`leave-alliance`)
            )
        }
    }

    let slRow = new ActionRowBuilder()
    .addComponents(slct);

    await interaction.reply({components: [slRow]});




    //wait removeOobFromAlliance(cId[1], cId[2]);
}