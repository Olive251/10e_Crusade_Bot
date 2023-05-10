const {SlashCommandBuilder, interaction} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('the bot will echo the content provided')
        .addStringOption(option =>
            option.setName('content')
                .setRequired(true)
                .setDescription('The input to echo back')),
        run:
        async ({interaction}) => {
            interaction.reply(interaction.options.get('content').value);
            return;
        }
}