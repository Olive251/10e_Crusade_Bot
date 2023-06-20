const createOrderOfBattle = require('../../../helpers/OrdersOfBattle/createOrderOfBattle')
const {Crusade} = require('../../../data/schemas')
module.exports = async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    if (!interaction.customId && !interaction.customId.includes('new-oob_')) return;

    cId = interaction.customId.split('_');
    let oobName = await interaction.fields.getTextInputValue(`oob-name-input`);
    let result = await createOrderOfBattle(oobName, interaction.guild, interaction.user, cId[1], cId[2]);

    console.log(result);
    if (result.result){
        interaction.reply({content: result.msg, ephemeral: true})
    } else {
        interaction.reply(`++Issue communing with the machine spirits++`)
    }
}