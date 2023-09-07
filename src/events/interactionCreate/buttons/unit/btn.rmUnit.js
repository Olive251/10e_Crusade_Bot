const rmUnit = require('../../../../helpers/OrdersOfBattle/units/rmUnit.js')

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith(`rm-unit_`)) return;

    await interaction.deferReply({ephemeral: true});

    let oobId = interaction.customId.split(`_`)[2];
    let unitId = interaction.customId.split(`_`)[1];

    // console.log(`Removing unit ${unitId} from OOB ${oobId}`);
    let result = await rmUnit(oobId, unitId);

    if (result.r){
        await interaction.editReply(`Unit removed from order of battle`);
        return;
    }
    else {
        await interaction.editReply({content: `++Problem removing unit from order of battle++`, ephemeral: true});
        console.log(`Error in rmUnit: ${result.e}`);
        return;
    }
}