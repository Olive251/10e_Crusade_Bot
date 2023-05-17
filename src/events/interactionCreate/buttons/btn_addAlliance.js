const {ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle} = require('discord.js');
const {Crusade} = require('../../../data/schemas.js');
const addAllianceToCrusade = require('../../../helpers/addAllianceToCrusade.js');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.includes('add_alliance_')){
        //13
        let searchCrusadeId = interaction.customId.substr(13, interaction.customId.length);
        var crusade;
        try{
            crusade = await Crusade.findOne({_id: searchCrusadeId});

            let modal = new ModalBuilder()
            .setCustomId(`new_alliance_${searchCrusadeId}`)
            .setTitle(`Alliance Name`);
            
            let allianceNameInput = new TextInputBuilder()
            .setCustomId(`alliance_name_input_${searchCrusadeId}`)
            .setLabel(`What is the name of the alliance?`)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(100)
            .setRequired(true);

            actionRow = new ActionRowBuilder().addComponents(allianceNameInput);

            modal.addComponents(actionRow);

            await interaction.showModal(modal);
            
        } catch (err){
            console.log(`${err}`)
            interaction.reply(`++ Error communing with the deeper machine spirits ++`);
            return;
        }
    }
}