const removeOobFromAlliance = require('../../../helpers/Alliance/removeOobFromAlliance');

module.exports = async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (!interaction.values[0].includes('leave-alliance_')) return;

    let cId = interaction.values[0].split('_');
    let result = await removeOobFromAlliance(cId[1], cId[2], cId[3]);

    if (result.result){
        interaction.reply({content: result.msg})
    }
    else {
        interaction.reply({content: result.msg, ephemeral: true});
    }

}