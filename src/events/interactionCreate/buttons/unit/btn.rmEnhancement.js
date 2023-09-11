const rmEnhancement = require('../../../../helpers/OrdersOfBattle/units/rmEnhancement.js')


module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith('rm-enhancement_')) return;

    await interaction.deferReply({ephemeral: true});

    const unitId = interaction.customId.split('_')[1];
    const oobId = interaction.customId.split('_')[2];

    let result = await rmEnhancement(oobId, unitId);

    if (result.r){
        interaction.editReply({content: `Enhancement removed from ${result.u.name}`, ephemeral: true});
        return;
    } else {
        interaction.editReply({content: `++Error removing enhancement++`, ephemeral: true});
        console.log(`Error rmEnhancement helper: ${result.e}`)
        return;
    }
}