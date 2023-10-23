const {ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith('update-oob-size_')) return;

    let unitId = interaction.customId.split('_')[1];
    let oobId = interaction.customId.split('_')[2];

    let modal = new ModalBuilder()
    .setCustomId(`update-oob-size-mdl_${unitId}_${oobId}`)
    .setTitle('Update Order of Battle Size')
    
    let input = new TextInputBuilder()
    .setCustomId(`size-chg`)
    .setLabel('Update Order of Battle Size')
    .setPlaceholder(`Enter the Order of Battle's new max points`)
    .setStyle(TextInputStyle.Short)
    .setMaxLength(4)
    .setRequired(true);

    let ar0 = new ActionRowBuilder().addComponents(input);
    modal.addComponents(ar0);

    await interaction.showModal(modal);
    return;

}