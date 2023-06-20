const newUnit = require('../../../../helpers/OrdersOfBattle/units/newUnit');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.includes('add-unit_')) return;

    let cId = interaction.customId.split('_');
    console.log(cId);

    try{
        
    }
    catch (err) {
        console.log(`Error in btn.addUnit\n${err}`);
    }
}