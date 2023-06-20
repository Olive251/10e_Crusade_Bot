const newUnit = require('../../../helpers/OrdersOfBattle/units/newUnit');

module.exports = async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    if (!interaction.customId ) return;
    if (!interaction.customId.includes('new-unit_')) return;

    cId = interaction.customId.split('_');
    console.log(cId);

    let uName = interaction.fields.getTextInputValue(`new-unit-name`);
    let uType = interaction.fields.getTextInputValue(`new-unit-type`);
    let uPoints = interaction.fields.getTextInputValue(`new-unit-points`);

    uPoints = parseInt(uPoints);

    await newUnit(uName, uType, uPoints, cId[1]);


}