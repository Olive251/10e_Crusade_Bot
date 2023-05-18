const {Crusade, Alliance} = require('../../data/schemas.js');
const {SlashCommandBuilder} = require('discord.js')
const removeAllianceFromCrusade = require('../../helpers/removeAllianceFromCrusade.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('remove-alliance')
    .setDescription('Remove an alliance from a crusade')
    .addStringOption(option => 
        option.setName('crusade-name')
        .setDescription('Name of the crusade to remove alliance from')
        .setRequired(true)
        )
    .addStringOption(option => 
        option.setName('alliance-name')
        .setDescription('Name of the alliance to remove')
        .setRequired(true)
    ),
    run: async ({interaction}) => {
        await interaction.deferReply();

        try{
            let crusadeName = await interaction.options.get('crusade-name').value;
            let allianceName = await interaction.options.get('alliance-name').value;
            let crusade = await Crusade.findOne({name: crusadeName, guildID: interaction.guildId})
            var targetAlliance;
            for (alliance of crusade.alliances){
                if (alliance.name === allianceName){
                    targetAlliance = alliance._id;
                }
            }
            let result = await removeAllianceFromCrusade(crusade._id, targetAlliance)
            if (result){
                interaction.editReply(`${allianceName} removed from ${crusadeName}`);
                return;
            } else {
                interaction.editReply(`There was a probelm removing ${allianceName} from ${crusadeName}`);
                return;
            }
        } catch (err) {
            console.log(err);
            interaction.editReply(`There was a probelm removing ${allianceName} from ${crusadeName}`);
            return;
        }
    }
}