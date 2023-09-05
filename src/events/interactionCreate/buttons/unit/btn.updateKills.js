const updateKills = require('../../../../helpers/OrdersOfBattle/units/updateKills.js')
const {ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
const client = require('../../../../index.js');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith('update-kills_')) return;

    let unitId = interaction.customId.split('_')[1];
    let oobId = interaction.customId.split('_')[2];

    let modal = new ModalBuilder()
    .setCustomId(`update-kills-mdl_${unitId}_${oobId}`)
    .setTitle('Update Kills')

    let input = new TextInputBuilder()
    .setCustomId(`kills-chg`)
    .setLabel('Update Kills (remove kills w/negative number)')
    .setPlaceholder('Enter the number of kills to add or remove')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(3)
    .setRequired(true);

    let ar0 = new ActionRowBuilder().addComponents(input);
    modal.addComponents(ar0);

    await interaction.showModal(modal);
    return;

    // client.on('interactionCreate', async (modalSubmit) => {
    //     if (!modalSubmit.isModalSubmit) return;
    //     if (modalSubmit.customId != `update-kills_${unitId}_${oobId}`) return;
    //     await modalSubmit.deferReply({ephemeral: true});

    //     let kDif = parseInt(modalSubmit.fields.getTextInputValue(`kills-chg`))

    //     try {
    //         let result = await updateKills(oobId, unitId, kDif);
    //         await modalSubmit.editReply({ content: `**${result.u.name}**: Kills updated by **${kDif}**\n*Kill tally: ${result.u.killCount}*`, ephemeral: true });
    //     }
    //     catch (err){
    //         console.log(err);
    //         await modalSubmit.editReply({ content: '++Unable to update kill tally++', ephemeral: true });    
    //     }
    // });
}