// bot invite link 
// https://discord.com/api/oauth2/authorize?client_id=1103330904304254986&permissions=8&scope=bot%20applications.commands
const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config();
const {CommandHandler} = require('djs-commander');
const path = require('path');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
})

new CommandHandler({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    testServer: '888117879692754975',
})

client.login(process.env.TOKEN);