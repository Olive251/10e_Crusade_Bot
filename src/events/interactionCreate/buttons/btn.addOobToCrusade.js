const {Crusade} = require('../../../data/schemas');
const {ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle} = require('discord.js');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;

    if (!interaction.customId.includes(`add_OoB_toCrusade_`)) return;
    try{
        let searchCrusadeId = interaction.customId.substr(18, interaction.customId.length);

        let crusade = await Crusade.findOne({_id: searchCrusadeId});

        interaction.reply(`${crusade.name} check`);
        return;
    }
    catch (err){
        console.log(`Error in btn.addOobToCrusade`)
        return;
    }

}