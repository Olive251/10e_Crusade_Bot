const updateKills = require('../../../../helpers/OrdersOfBattle/units/updateKills.js')

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.includes('-1-kill_')) return;

    const unitId = interaction.customId.split('_')[1];
    const oobId = interaction.customId.split('_')[2];

    try {
        let result = await updateKills(oobId, unitId, -1);
        
        if (result.r){
            await interaction.reply({ content: `**${result.u.name}**: Kills updated by **1**\n*Kill tally: ${result.u.killCount}*`, ephemeral: true });
        } 
        else throw('error in updateKills');
    }
    catch (err) {
        console.log(err);
        await interaction.reply({ content: '++Unable to update kill tally++', ephemeral: true });
    }
}