// bot invite link 
// https://discord.com/api/oauth2/authorize?client_id=1103330904304254986&permissions=8&scope=bot%20applications.commands
const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config();
const {connect_db} = require('./data/mongo-connection.js');
const {register_crusade, find_crusade, remove_crusade} = require('./cmd-functs/crusade-commands.js');

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
               interaction.reply(`The ${crusade.name} was successfully created!`);
            } catch (err){
                interaction.reply(`ERROR: Could not create "${name}"`);
            }

            break;

        case 'find-crusade':
            let searchCrusade = interaction.options.get('crusade-name').value;
            crusade = await find_crusade(guildID, searchCrusade);

            if (crusade){
                interaction.reply(crusade[0].name + 'was found successfully!');
            }
            else
                interaction.reply(`Unable to locate crusade...`);

            break;

        case 'list-crusades':
            var crusades;
            try{
                crusades = await find_crusade(guildID);
            } catch (err) {
                interaction.reply("There was an error finding crusades");
            }

            if (crusades){
                var message = '';
                crusades.forEach((crusade, index) => {
                    message += `- ${crusade.name}\n`;
                })
                interaction.reply(message);
            }
            break;
        case 'remove-crusade':
            try{
                remove_crusade(interaction.options.get('crusade-name').value, guildID);
            } catch (err){
                interaction.reply("There was a problem trying to remove the crusade");
                break;
            }

            interaction.reply(`Crusade successfully removed`);
            break;
            
        default:
            return;
    }
})

client.login(process.env.TOKEN);