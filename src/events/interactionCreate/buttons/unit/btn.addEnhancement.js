const {ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith('add-enhancement_')) return;

    // interaction.deferReply({ ephemeral: true });

    let oobId = interaction.customId.split('_')[2];
    let unitId = interaction.customId.split('_')[1];

    let modal = new ModalBuilder()
    .setCustomId('add-enhancement-mdl_')
    .setTitle(`Add Enhancement`)

    let eNameInput = new TextInputBuilder()
    .setCustomId('enhancement-name')
    .setLabel('Enhancement Name')
    .setPlaceholder('Enter the name of the enhancement')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(50)
    .setRequired(true)

    let ePointsInput = new TextInputBuilder()
    .setCustomId('enhancement-pts')
    .setLabel('Points Cost')
    .setPlaceholder('Enter the points cost of the enhancement')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(3)
    .setRequired(true)

    let ar0 = new ActionRowBuilder().addComponents(eNameInput);
    let ar1 = new ActionRowBuilder().addComponents(ePointsInput);
    modal.addComponents(ar0, ar1);

    await interaction.showModal(modal);
}