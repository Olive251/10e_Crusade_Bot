const newUnit = require('../../../helpers/OrdersOfBattle/units/newUnit');

module.exports = async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    if (!interaction.customId ) return;
    if (!interaction.customId.includes('new-unit_')) return;

    cId = interaction.customId.split('_');

    let uName = interaction.fields.getTextInputValue(`new-unit-name`);
    let uType = interaction.fields.getTextInputValue(`new-unit-type`);
    let uPoints = interaction.fields.getTextInputValue(`new-unit-points`);

    uPoints = parseInt(uPoints);

    let result = await newUnit(uName, uType, uPoints, cId[1]);

    if (result.result){
        interaction.reply({content: `✅ ${uName} was sucesfully added to ${result.oobName}`})
    }
    else {
        interaction.reply(`++There was an issue communing with the machine spirits++`);
    }
}