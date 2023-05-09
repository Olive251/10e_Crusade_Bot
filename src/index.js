// bot invite link 
// https://discord.com/api/oauth2/authorize?client_id=1103330904304254986&permissions=8&scope=bot%20applications.commands
const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config();
const {connect_db} = require('./data/mongo-connection.js');

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

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    switch(interaction.commandName) {
        case 'echo':
            interaction.reply(interaction.options.get('echo-content').value);
            break;
        default:
            return;
    }
})

client.login(process.env.TOKEN);