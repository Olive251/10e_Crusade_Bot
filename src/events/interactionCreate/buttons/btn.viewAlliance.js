const genAllianceReport = require('../../../helpers/Alliance/generateAllianceReport')

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.includes('view-alliance_')) return;
    
    let cId = interaction.customId.split('_');
    await genAllianceReport(interaction, cId[1], cId[2]);
    
}