const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder} = require('discord.js');
const {OOB} = require('../../data/schemas');
const getOOB = require('../../helpers/OrdersOfBattle/getOrderOfBattle.js');
const genReport = require('../../helpers/OrdersOfBattle/generateOOBReport.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('order-of-battle-info')
    .setDescription(`View one of your Orders of Battle`)
    .addStringOption(option => 
        option.setName('name')
        .setRequired(true)
        .setDescription('Name of the crusade you wish to view')
        ),
    run: async({interaction}) => {
        await interaction.deferReply({ephemeral: true});

        let user = await interaction.user;
        let guild = await interaction.guildId;
        let name = await interaction.options.get('name').value;

        let oob = await getOOB(name, user, guild);
        var msg;

        if (oob){
            msg = 'test: ' + oob.name + `\n${interaction.member.displayName}`;
            await genReport(interaction, oob);
        }
        else {
            msg = `Unabel to find ${name} in your Orders of Battle`;
        }

        //await interaction.editReply(msg);
    }
    
}