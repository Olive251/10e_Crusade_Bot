const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const {Crusade} = require('../../../data/schemas');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.includes('leave_crusade_')){
        //14
        let searchCrusadeId = interaction.customId.substr(14, interaction.customId.length);

        let crusade = await Crusade.findOne({_id: searchCrusadeId});

        
    }

}