const {ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.includes('add-unit')) return;

    let cId = interaction.customId.split('_');

    let modal = new ModalBuilder()
        .setCustomId(`new-unit_${cId[1]}`)
        .setTitle(`New Unit`)

        let uNameInput = new TextInputBuilder()
        .setCustomId('new-unit-name')
        .setLabel('Unit name...')
        .setStyle(TextInputStyle.Short)
        .setMaxLength(50)
        .setRequired(true);

        let uUnitType = new TextInputBuilder()
        .setCustomId('new-unit-type')
        .setLabel('Unit type...')
        .setStyle(TextInputStyle.Short)
        .setMaxLength(50)
        .setRequired(true);

        let uPointsValue = new TextInputBuilder()
        .setCustomId('new-unit-points')
        .setLabel('Unit points cost...')
        .setStyle(TextInputStyle.Short)
        .setMaxLength(3)
        .setRequired(true);

        let ar0 = new ActionRowBuilder().addComponents(uNameInput);
        let ar1 = new ActionRowBuilder().addComponents(uUnitType);
        let ar2 = new ActionRowBuilder().addComponents(uPointsValue);
        modal.addComponents(ar0, ar1, ar2);
        await interaction.showModal(modal);

    try{
        
    }
    catch (err) {
        console.log(`Error in btn.addUnit\n${err}`);
    }
}