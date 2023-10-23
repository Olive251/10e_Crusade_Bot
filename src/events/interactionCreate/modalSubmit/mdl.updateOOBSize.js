const updateSize = require('../../../helpers/OrdersOfBattle/updateOOBSize.js')

module.exports = async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    if (!interaction.customId) return;
    if (!interaction.customId.startsWith(`update-oob-size-mdl_`)) return;

    await interaction.deferReply({ephemeral: true});
    
    let oobId = interaction.customId.split(`_`)[1];

    // let result = await updatePoints(oobId, unitId, parseInt(interaction.fields.getTextInputValue(`size-chg`)));
    let result = await updateSize(oobId, parseInt(interaction.fields.getTextInputValue(`size-chg`)));

    if (result.r){
        await interaction.editReply({ content: `Order of Battle **${result.o.name}** size updated to **${result.o.size}**`, ephemeral: true });
    }
    else {
        await interaction.editReply({ content: '++Unable to update order of battle size++', ephemeral: true });    
    }
}