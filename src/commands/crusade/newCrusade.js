const {SlashCommandBuilder} = require('discord.js');
const {Crusade} = require('../../data/schemas');

const register_crusade = async(name, guildId) => {
    try {
        const newCrusade = new Crusade({
          name,
          guildID: guildId,
          description: '',
          alliances: []
        });
        const savedCrusade = await newCrusade.save();
        return savedCrusade;
      } catch (err) {
        console.error(`Error creating crusade: ${err}`);
        throw err;
      }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('new-crusade')
        .setDescription('Add a crusade to your server')
        .addStringOption(option => 
            option.setName('name')
                .setRequired(true)
                .setDescription('The name of the crusade you wish to create')
            ),
    run: async ({interaction}) => {
        var crusade;
        try{
            crusade = await register_crusade(interaction.options.get('name').value, interaction.guildId);
            interaction.reply(`${crusade.name} was successfully created!`);
        } catch (err){
            interaction.reply('❗ Unable to create new crusade');
        }
        return crusade;
    }
}