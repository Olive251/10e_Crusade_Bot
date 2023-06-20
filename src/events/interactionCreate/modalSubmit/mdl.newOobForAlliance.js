const createOrderOfBattle = require('../../../helpers/OrdersOfBattle/createOrderOfBattle')

module.exports = async (interaction) => {
    if (!interaction.isModalSubmit) return;
    if (!interaction.customId || !interaction.customId.includes('new-oob_')) return;

    cId = interaction.customId.split('_');

    let oobName = await interaction.fields.getTextInputValue(`oob-name-input`);
    let result = await createOrderOfBattle(oobName, interaction.guild, interaction.user, cId[1], cId[2]);

    if (result){
        console.log('result good')
    }
}