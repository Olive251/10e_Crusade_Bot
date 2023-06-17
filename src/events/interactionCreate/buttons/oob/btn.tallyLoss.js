const {OOB} = require ('../../../../data/schemas');
const tallyUpdateReport = require('../../../../helpers/OrdersOfBattle/tallyUpdateReport');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;

    if (!interaction.customId.includes('add_loss_')) return;

    try {
        let searchOobId = interaction.customId.substr(9, interaction.customId.length);

        let oob = await OOB.findOne({_id: searchOobId});

        ++oob.tally.l;

        let oobChk = await OOB.findOneAndUpdate({_id:oob._id}, {tally: oob.tally}, {new: true});
        if (!oobChk) throw("Failed to locate/update OOB in database");

        if (!tallyUpdateReport(interaction, oobChk)) 
            throw("Failed to generate tallyUpdateReport");

    }
    catch (err){
        console.log(`error in btn.tallyWin:\n${err}`);
        interaction.reply('++There was an issue communing with the machine spirits++'+
        'Win tally may not be updated')
    }

    return;
    
}