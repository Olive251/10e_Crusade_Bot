const updateExp = require('../../../helpers/OrdersOfBattle/units/updateExp.js');

module.exports = async (modalSubmit) => {
    if (!modalSubmit.customId) return;
    if (!modalSubmit.customId.startsWith('upd-exp_')) return;

    await modalSubmit.deferReply({ephemeral: true});

    // Get the data entered by the user
    let xpDif = modalSubmit.fields.getTextInputValue("xp-change");
    xpDif = parseInt(xpDif);

    // Get the unit ID and OOB ID from the custom ID
    let oobId = modalSubmit.customId.split('_')[1];
    let unitId = modalSubmit.customId.split('_')[2];

    let result = await updateExp(oobId, unitId, xpDif);
    if (result.r){
        
        let message = `**${result.unit.name}'s experience has been updated by ${xpDif} experience points.**\n*-Current exp: ${result.unit.xp}*\n*-Current rank: ${result.unit.rank}*`;
        modalSubmit.editReply({content: message, ephemeral: true});
        return;
    }
    else {
        modalSubmit.editReply({content: `++There was a problem updating the experience++`, ephemeral: true});
        return;
    }
}