const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder} = require('discord.js');
const {OOB} = require('../../data/schemas');
const generateOOBsReport = require('../../helpers/OrdersOfBattle/generateOOBsReport.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('list-my-orders-of-battle')
    .setDescription(`View a list of your orders of battle, those of another users, or those in a specific crusade`),
    run: async({interaction}) => {
        await interaction.deferReply({ephemeral: true});

        let user = await interaction.user;
        let guild = await interaction.guildId;

        let oobs = await generateOOBsReport(1, user, guild);

        var msg = '';
        for (const oob of oobs){
            msg += `--${oob.name}\n`
        }

        await interaction.editReply(msg);
        return;

    }
    
}