const {OOB, Alliance, Crusade} = require('../../../data/schemas');
const addOobToAlliance = require('../../../helpers/Alliance/addOobToAlliance');

module.exports = async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (!interaction.values[0].includes('join-alliance_')) return;

    let cId = interaction.values[0].split('_');

    let result = await addOobToAlliance(cId[1], cId[2], cId[3]);

    if (result.result){
        interaction.reply(`${result.msg}`);
    }
    else {
        interaction.reply(`++There was a problem communing with the machine spirits++`);
    }
}