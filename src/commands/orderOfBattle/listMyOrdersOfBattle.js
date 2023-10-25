const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} = require('discord.js');
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

        if (oobs.length == 0){
            embed.setDescription('You have no Orders of Battle')
            await interaction.editReply({embeds: [embed]});
            return;
        }

        for (const oob of oobs){
            msg += `- ${oob.name}\n`
        }

        //select menu setup
        let slRow = new ActionRowBuilder();

        const slct = new StringSelectMenuBuilder()
        .setCustomId('oob-list-select')
        .setPlaceholder('Select an order of battle to see details...');

        for (const oob of oobs){
            slct.addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel(`${oob.name}`)
                .setValue(`view-oob_${oob._id}`)
            )
        }
       

        embed.addFields(
            {name: 'Orders of Battle', value: msg}
        )

        await interaction.editReply({embeds: [embed], components: [slRow.addComponents(slct)]});
        return;

    }
    
}