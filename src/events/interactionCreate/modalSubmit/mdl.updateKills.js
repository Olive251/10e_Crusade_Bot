const updateKills = require('../../../helpers/OrdersOfBattle/units/updateKills.js')

module.exports = async (interaction) => {
    if (!interaction.isModalSubmit()) return;
    if (!interaction.customId) return;
    if (!interaction.customId.startsWith(`update-kills-mdl_`)) return;
    await interaction.deferReply({ephemeral: true});

    let oobId = interaction.customId.split(`_`)[2];
    let unitId = interaction.customId.split(`_`)[1];

    let kDif = parseInt(interaction.fields.getTextInputValue(`kills-chg`))

    try {
        let result = await updateKills(oobId, unitId, kDif);
        await interaction.editReply({ content: `**${result.u.name}**: Kills updated by **${kDif}**\n*Kill tally: ${result.u.killCount}*`, ephemeral: true });
    }
    catch (err){
        console.log(err);
        await interaction.editReply({ content: '++Unable to update kill tally++', ephemeral: true });    
    }
}