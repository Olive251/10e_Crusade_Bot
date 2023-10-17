const {ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith('update-base-points-value_')) return;

    let unitId = interaction.customId.split('_')[1];
    let oobId = interaction.customId.split('_')[2];

    let modal = new ModalBuilder()
    .setCustomId(`update-base-points-value-mdl_${unitId}_${oobId}`)
    .setTitle('Update Base Points Value')
    
    let input = new TextInputBuilder()
    .setCustomId(`pts-chg`)
    .setLabel('Update Base Points Value')
    .setPlaceholder(`Enter the unit's new base points value`)
    .setStyle(TextInputStyle.Short)
    .setMaxLength(3)
    .setRequired(true);

    let ar0 = new ActionRowBuilder().addComponents(input);
    modal.addComponents(ar0);

    await interaction.showModal(modal);
    return;

}