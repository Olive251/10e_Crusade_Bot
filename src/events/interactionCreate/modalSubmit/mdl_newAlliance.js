const {} = require('discord.js')
const addAllianceToCrusade = require('../../../helpers/addAllianceToCrusade.js');

module.exports = async (interaction) => {
    if (!interaction.isModalSubmit){
        return;
    }

    if (interaction.customId && interaction.customId.includes('new_alliance_')){
        
        let searchCrusadeId = interaction.customId.substr(13, interaction.customId.length);
        let allianceName = await interaction.fields.getTextInputValue(`alliance_name_input_${searchCrusadeId}`)

        let result = addAllianceToCrusade(searchCrusadeId, allianceName);
        
        if (result){
            interaction.reply(`${allianceName} was successfully added to the crusade.`);
        }
        else {
            interaction.reply(`There was a problem registering the alliance.`);
        }
    }
}