const {SlashCommandBuilder} = require('discord.js');
const {Crusade} = require('../../data/schemas');

//helper to save the data
const register_crusade = async(name, guildId, tagline, docs) => {
    try {
        const newCrusade = new Crusade({
          name,
          guildID: guildId,
          description: tagline || '',
          externalCrusadeDoc: docs || '',
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
            )
        .addStringOption(option =>
            option.setName('tagline')
                .setRequired(true)
                .setDescription('A sentence or two introduction to the crusade'))
        .addStringOption(option =>
            option.setName('external-doc')
                .setRequired(false)
                .setDescription('A link to share any additional documentation for the crusade')),
    run: async ({interaction}) => {
        var crusade;                  
        try{

            var doc = '';
            if (interaction.options.get('external-doc')){
                doc = interaction.options.get('external-doc').value;
            }

            crusade = await register_crusade(
                interaction.options.get('name').value, 
                interaction.guildId, 
                interaction.options.get('tagline').value,
                doc,
                );
            interaction.reply(`✅ ${crusade.name} was successfully created!`);
        } catch (err){
            console.log(`Error creating new crusade:\n ${err}`);
            interaction.reply('❗ Unable to create new crusade');
        }
        return crusade;
    }
}