const createOrderOfBattle = require('../../../helpers/OrdersOfBattle/createOrderOfBattle')
const {Crusade} = require('../../../data/schemas')
module.exports = async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    if (!interaction.customId) return;
    if (!interaction.customId.includes('new-oob_')) return;

    cId = interaction.customId.split('_');
    let oobName = await interaction.fields.getTextInputValue(`oob-name-input`);
    let result = await createOrderOfBattle(oobName, interaction.guild, interaction.user, cId[1], cId[2]);

    if (result.result){
        interaction.reply({content: result.msg, ephemeral: false})
    } else {
        interaction.reply({content: `++Issue communing with the machine spirits++`, ephemeral: true})
    }
}