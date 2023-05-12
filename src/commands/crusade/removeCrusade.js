const {SlashCommandBuilder} = require('discord.js');
const {Crusade} = require('../../data/schemas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-crusade')
        .setDescription('Remove a crusade from your server')
        .addStringOption(option => 
            option.setName('name')
                .setRequired(true)
                .setDescription('The name of the crusade you wish to remove')
            ),
    run: async ({interaction}) => {
        let cName = interaction.options.get('name').value;
        try{

            if (!await Crusade.findOne({name: cName, guildID: interaction.guildId})){
                interaction.reply(`❗ ${cName} was not found in the server records`);
                return;
            }

            await Crusade.deleteOne({name: cName, guildID: interaction.guildId})

            //TODO change output if crusade does not exist
            //current implementation gives success message in this case
            if (!await Crusade.findOne({name: cName, guildID: interaction.guildId})){
                interaction.reply(`✅ ${cName} successfully removed`);
            } else {
                interaction.reply(`❗ There was a problem removing the crusade`)
            }
        } catch (err){
            console.log(`Unable to remove crusade:\n ${err}`);
            interaction.reply(`❗ There was a problem removing the crusade`);
        }
    }
}