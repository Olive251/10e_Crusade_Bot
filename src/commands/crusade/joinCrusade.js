const {SlashCommandBuilder} = require('discord.js');
const {Crusade} = require('../../data/schemas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join-crusade')
        .setDescription(`Join one of the crusades available on your server`)
        .addStringOption(option =>
            option.setName('crusade-name')
                .setDescription(`The name of the crusade you wish to join`)),
    run: async ({interaction}) => {
        
        if (!interaction.options.get('crusade-name').value){
            interaction.reply(`Optionless version not yet implemented!`);
            return;
        }
        await interaction.deferReply();
        const user = interaction.options.getUser('user') || interaction.user;
        var crusade;
        try{
            crusade = await Crusade.findOne({name: interaction.options.get('crusade-name').value, guildID: interaction.guildId});
            if (!crusade){
                interaction.editReply(`${interaction.options.get('crusade-name').value} was not found among this server's crusade records. Please ensure you use the correct name.`);
                return;
            };
        } catch (err){
            console.log(`ERROR in joinCrusade:\n${err}`);
            interaction.editReply(`++Unable to join the crusade. Problem communing with the deeper machine spirits.++`);
            return;
        }
        
        if (!crusade.players.includes(user.id)){
            crusade.players.push(user.id);
            await Crusade.updateOne({_id:crusade._id}, {players: crusade.players});

            interaction.editReply(`✅ - You have sucessfully joined the ${crusade.name}!`);
        }
        else {
            interaction.editReply(`❗ - You're already in the ${crusade.name}, you silly goose!`);
            //TODO - Need to move the checking functionality too the to the addUserToCrusade.js
        }
        
    }
            
}