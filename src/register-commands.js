require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType, Application} = require('discord.js');

const commands = [
    {
        name: 'echo',
        description: 'repeats what you say',
        options: [
            {
                name: 'echo-content',
                description: 'The content you want echoed',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    }, 
    {
        name: 'new-crusade',
        description: 'register a new crusade for your server',
        options: [
            {
                name: 'crusade-name',
                description: 'The name of your crusade',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ]
    },
    {
        name: 'find-crusade',
        description: 'get summary information of a crusade',
        options: [
            {
                name: 'crusade-name',
                description: 'The name of the crusade you want information on',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
        
    },
    {
        name: 'list-crusades',
        description: `get a summary list of your server's crusades`,
    },
    {
        name: 'remove-crusade',
        description: `remove a crusade from your server`,
        options: [
            {
                name: 'crusade-name',
                description: 'The name of the crusade you want to remove',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ]
    }

]

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log('Registering slash commands....');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands}
        )

        console.log(`Slash commands registered successfully...`);

    } catch (err) {
        console.log(`Error: ${err}`);
    }
})();