const {Crusade} = require('../../../data/schemas.js');
const addUserToCrusade = require('../../../helpers/addUserToCrusade.js');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.includes('join_crusade_')){
        //13
        let searchCrusadeId = interaction.customId.substr(13, interaction.customId.length);
        var crusade;
        try{
            crusade = await Crusade.findOne({_id: searchCrusadeId});
        } catch (err) {
            console.log(`Error finding crusade ${searchCrusadeId}\n ${err}`);
            interaction.reply(`❗ - There was a problem joining the ${crusade.name}`)
            return;
        }

        let result = addUserToCrusade(crusade, interaction.user.id);

        if (result){
            interaction.reply(`✅ - You have sucessfully joined the ${crusade.name}`);
        } else {
            interaction.reply(`❗ - There was a problem joining the ${crusade.name}`);
        }
    }
}