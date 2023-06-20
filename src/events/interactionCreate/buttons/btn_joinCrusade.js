const {Crusade} = require('../../../data/schemas.js');
const addUserToCrusade = require('../../../helpers/addUserToCrusade.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle}  = require ('discord.js');


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

        if (crusade.players.includes(interaction.user))
        {
            interaction.reply(`❗ - You have already joined the ${crusade.name}`)
            return;
        }

        let result = addUserToCrusade(crusade, interaction.user);

        if (result){
            let optRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Add OoB')
                .setStyle(ButtonStyle.Primary)
                .setCustomId(`add_OoB_toCrusade_${crusade._id}`),
            )

            interaction.reply(`✅ - You have sucessfully joined the ${crusade.name}. You can now add your Order(s) of Battle to the crusade.`);
        } else {
            interaction.reply(`❗ - There was a problem joining the ${crusade.name}`);
        }
    }
}