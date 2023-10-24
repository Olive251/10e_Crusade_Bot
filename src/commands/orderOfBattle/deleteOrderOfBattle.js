const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder} = require('discord.js');
const {OOB} = require('../../data/schemas');
const deleteOob = require('../../helpers/OrdersOfBattle/deleteOrderOfBattle');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('delete-order-of-battle')
    .setDescription('Delete one of your Orders of Battle')
    .addStringOption(option =>
        option.setName('order-name')
        .setDescription('Name of the Order of Battle you wish to delete (Case Sensitive)')
        .setRequired(true)
    ),
    run: async ({interaction}) => {
        await interaction.deferReply();
        let reply = ''
        try{
            let oobName = await interaction.options.get('order-name').value;
            let user = await interaction.user;
            let result = await deleteOob(oobName, user, interaction.guildId);
            if (result){
                reply = `${oobName} sucesfully deleted.`
            } else {
                reply = `"${oobName}" does not appear to exist in your Orders of Battle\n(Hint: Use /list-my-orders-of-battle)`
            }

        } catch(err) {
            reply = "There was a problem deleting the Order of Battle"
        }

        interaction.editReply(reply)
    }
}