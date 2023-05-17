const {} = require('discord.js');
const {Crusade} = require('../../../data/schemas.js');
const removeUserFromCrusade = require('../../../helpers/removeUserFromCrusade');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.includes('leave_crusade_')){
        //14
        let searchCrusadeId = interaction.customId.substr(14, interaction.customId.length);

        var crusade;

        try{
            crusade = await Crusade.findOne({_id: searchCrusadeId});
        } catch (err){
            console.log(err);
            interaction.reply(`❗ - There was a problem leaving the ${crusade.name}`)
            return;
        }
        
        let result = removeUserFromCrusade(crusade, interaction.user);

        if (result){
            interaction.reply(`✅ - You have sucessfully left the ${crusade.name}`);
        }
        else {
            interaction.reply(`❗ - There was a problem leaving the ${crusade.name}`);
        }
        
    }

}