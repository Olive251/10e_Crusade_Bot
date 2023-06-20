const createOrderOfBattle = require('../../../../helpers/OrdersOfBattle/createOrderOfBattle');
const {ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.includes('new-oob_')) return;

    try{
        let modal = new ModalBuilder()
            .setCustomId(`new-oob_${cId[1]}_${cId[2]}`)
            .setTitle(`Order of Battle Name`);
            
            let allianceNameInput = new TextInputBuilder()
            .setCustomId(`oob-name-input`)
            .setLabel(`What will you name your new Order of Battle?`)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(100)
            .setRequired(true);

            actionRow = new ActionRowBuilder().addComponents(allianceNameInput);

            modal.addComponents(actionRow);

            await interaction.showModal(modal);
    }
    catch (err){
        console.log(`Error in btn.newOobForAlliance\n${err}`);
    }

}