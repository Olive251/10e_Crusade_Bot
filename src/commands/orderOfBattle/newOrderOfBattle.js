const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder} = require('discord.js');
const createOrderOfBattle = require('../../helpers/OrdersOfBattle/createOrderOfBattle.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('new-order-of-battle')
        .setDescription(`Create a new Order of Battle assigned to your server profile`)
        .addStringOption(option =>
            option.setName('order-of-battle-name')
            .setDescription('Name of your Order of Battle')
            .setRequired(true)
            ),
    run: async({interaction}) => {
        await interaction.deferReply({ephemeral: true});
        let oobName = await interaction.options.get('order-of-battle-name').value;

        let result = createOrderOfBattle(oobName, interaction.guildId, interaction.user);

        if (result){
            interaction.editReply(`${oobName} was successfully create`);
        } else {
            interaction.editReply(`There was a problem creating the new Order of Battle`);
        }
    }
}