const newUnit = require('../../../helpers/OrdersOfBattle/units/newUnit');

module.exports = async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    if (!interaction.customId ) return;
    if (!interaction.customId.includes('new-unit_')) return;

    cId = interaction.customId.split('_');

    let uName = interaction.fields.getTextInputValue(`new-unit-name`);
    let uType = interaction.fields.getTextInputValue(`new-unit-type`);
    let uPoints = interaction.fields.getTextInputValue(`new-unit-points`);
    let uWargearOptions = interaction.fields.getTextInputValue(`new-unit-wargear`);

    //split wargear options into array
    let wargearOptions = uWargearOptions.split(',');
    var formattedWargear = [];
    for (const wargear of wargearOptions){
        formattedWargear.push({name: wargear.trim()});
    }
    console.log(formattedWargear);

    uPoints = parseInt(uPoints);

    let result = await newUnit(uName, uType, uPoints, formattedWargear, cId[1]);

    if (result.result){
        interaction.reply({content: `✅ ${uName} was sucesfully added to ${result.oobName}`})
    }
    else {
        interaction.reply(`++There was an issue communing with the machine spirits++`);
    }
}