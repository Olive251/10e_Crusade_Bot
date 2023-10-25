const genOOBReport = require('../../../helpers/OrdersOfBattle/generateOOBReport.js');
const {OOB} = require('../../../data/schemas');

module.exports = async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (!interaction.values[0].includes('view-oob_')) return;

    await interaction.deferReply({ephemeral: true});

    let oId = interaction.values[0].split('_');

    let oob = await OOB.findById(oId[1]);

    await genOOBReport(interaction, oob);
}