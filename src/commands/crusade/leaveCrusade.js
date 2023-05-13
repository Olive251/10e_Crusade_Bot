const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const {Crusade} = require('../../data/schemas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave-crusade')
        .setDescription('Leave a crusade you are currently in')
        .addStringOption(option =>
            option.setName('crusade-name')
            .setDescription('Name of the crusade you wish to leave')
            ),
    run: async ({interaction}) => {
        await interaction.deferReply();
        try{
            let crusadeName = interaction.options.get('crusade-name').value;
            if (!crusadeName){
                interaction.editReply(`x - Optionless not yet implemented. Please use the crusade-name option`);
                return;
            }

            let crusade = await Crusade.findOne({name: crusadeName, guildID: interaction.guildId});
            if (!crusade){
                interaction.editReply(`❗ - Unable to find "${crusadeName}" among this server's crusades`);
                return;
            }

            for (i = 0; i < crusade.players.length; i++){
                if (crusade.players[i] == interaction.user){
                    crusade.players[i] = null;

                    if (crusade.players.length > 1){
                        crusade.players.splice(i, i-1);
                        await Crusade.updateOne({_id: crusade._id}, {players: crusade.players});
                    }
                    else {
                        await Crusade.updateOne({_id: crusade._id}, {players: []});
                    }

                    interaction.editReply(`y - You have succesfully left the ${crusade.name}`);
                    return;
                }
            }

            interaction.editReply(`x - You are not a member of the ${crusade.name}`);
            return;


        } catch (err) {
            console.log(`Error in leaveCrusade:\n ${err}`);
            interaction.editReply(`x - There was an issue trying to remove you from the ${interaction.options.get('crusade-name').value}`);
        }
    }
}