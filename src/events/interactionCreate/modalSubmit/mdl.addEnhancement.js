const addEnhancement = require('../../../helpers/OrdersOfBattle/units/addEnhancement.js')

module.exports = async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    if (!interaction.customId.startsWith(`add-enhancement-mdl_`)) return;
    
    await interaction.deferReply({ephemeral: true});

    let oobId = interaction.customId.split(`_`)[1];
    let unitId = interaction.customId.split(`_`)[2];

    let eName = interaction.fields.getTextInputValue('enhancement-name');
    let ePts = parseInt(interaction.fields.getTextInputValue('enhancement-pts'));
    let e = {name: eName, pointsValue: ePts};

    let result = await addEnhancement(oobId, unitId, e);

    if (result.r) {
        interaction.editReply(`${result.u.name}: ${e.name} added successfully!\n*New Points Value: ${result.u.crusadePoints}*`);
        return;
    } 
    else {
        console.log(`Error in addEnhancement:\n${result.e}`);
        return;
    }
}
