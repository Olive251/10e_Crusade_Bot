const {Crusade} = require('../../../data/schemas.js');
const generateCrusadeReport = require('../../../helpers/generateCrusadeReport.js');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.includes('view_crusade_')){
        //13
        let searchCrusadeId = interaction.customId.substr(13, interaction.customId.length);
        var crusade;
        try{
            crusade = await Crusade.findOne({_id: searchCrusadeId});
        } catch (err){
            console.log(`${err}`)
            interaction.reply(`++ Error communing with the deeper machine spirits ++`);
            return;
        }

       generateCrusadeReport(interaction, crusade);
    }
}