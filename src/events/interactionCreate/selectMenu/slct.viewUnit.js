const generateUnitReport = require('../../../helpers/OrdersOfBattle/units/generateUnitReport');

module.exports = async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (!interaction.values[0].includes('view-unit_')) return;

    let cId = interaction.values[0].split('_');

    //interaction.deferReply({ephemeral: true});

    await generateUnitReport(interaction, cId[1], cId[2]);


}