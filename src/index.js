// bot invite link 
// https://discord.com/api/oauth2/authorize?client_id=1103330904304254986&permissions=8&scope=bot%20applications.commands
const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config();
const {connect_db} = require('./data/mongo-connection.js');
const {register_crusade, find_crusade} = require('./cmd-functs/crusade.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
})

client.on('ready', (c) => {
    connect_db();
    console.log(`✅ - ${c.user.tag} is online! Huzzah! - ✅`);
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    let guildID = interaction.guildId;

    switch(interaction.commandName) {
        case 'echo':
            interaction.reply(interaction.options.get('echo-content').value);
            break;
        case 'new-crusade':
            let name = interaction.options.get('crusade-name').value;
            var crusade 

            try{
               crusade = await register_crusade(name, guildID);
               interaction.reply(`The "${crusade.name} was successfully created!`);
            } catch (err){
                interaction.reply(`ERROR: Could not create "${name}"`);
            }

            break;
        case 'find-crusade':
            let searchCrusade = interaction.options.get();
            crusade = await find_crusade(guildID, searchCrusade);

            if (crusade)
                interaction.reply(crusade);
            else
                interaction.reply(`Unable to locate crusade...`);

            break;
        default:
            return;
    }
})

client.login(process.env.TOKEN);