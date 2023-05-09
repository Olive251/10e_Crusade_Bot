require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

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