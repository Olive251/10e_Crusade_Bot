const updatePoints = require('../../../helpers/OrdersOfBattle/units/updatePoints.js')

module.exports = async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    if (!interaction.customId) return;
    if (!interaction.customId.startsWith(`update-base-points-value-mdl_`)) return;

    await interaction.deferReply({ephemeral: true});
    
    let oobId = interaction.customId.split(`_`)[2];
    let unitId = interaction.customId.split(`_`)[1];

    let result = await updatePoints(oobId, unitId, parseInt(interaction.fields.getTextInputValue(`pts-chg`)));

    if (result.r){
        await interaction.editReply({ content: `**${result.u.name}**: Base points value updated to **${result.u.pointsValue}**`, ephemeral: true });
    }
    else {
        await interaction.editReply({ content: '++Unable to update base points value++', ephemeral: true });    
    }
}