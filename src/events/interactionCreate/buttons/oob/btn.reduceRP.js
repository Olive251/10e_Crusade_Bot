const modifyRP = require ('../../../../helpers/OrdersOfBattle/modifyRP');
const genRpUpdateReport = require ('../../../../helpers/OrdersOfBattle/genRpUpdateReport');


module.exports = async (interaction) => {
    if (!interaction.isButton()) return;

    if (!interaction.customId.includes('reduce_rp_')) return;
    let oobId = interaction.customId.substr(10, interaction.customId.length);

    try{
        let check = await modifyRP(oobId, -1);
        if (!check) throw(`issue modifying rp`);
        
        await genRpUpdateReport(interaction,oobId, -1);
    }
    catch (err) {
        console.log(`error in btn.addRP\n${err}`);
    }
}