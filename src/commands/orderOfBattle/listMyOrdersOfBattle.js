const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder} = require('discord.js');
const generateOOBsReport = require('../../helpers/OrdersOfBattle/generateOOBsList.js');
const getUserInfo = require('../../helpers/getUserInfo');

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
        let player = await getUserInfo(interaction.user.id, interaction.guild)
        const embed = new EmbedBuilder()
        .setTitle(`${player.nickname || interaction.user.username}'s Orders of Battle`)
        .setColor('Random')

        for (const oob of oobs){
            msg += `- ${oob.name}\n`
        }

        embed.addFields(
            {name: 'Orders of Battle', value: msg}
        )

        await interaction.editReply({embeds: [embed]});
        return;

    }
    
}