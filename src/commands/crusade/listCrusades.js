const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const {Crusade} = require('../../data/schemas');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list-crusades')
        .setDescription(`Generate a report display the server's crusades`),
    run: async ({interaction}) => {
        await interaction.deferReply();
        try{
            let crusades = await Crusade.find({guildID: interaction.guildId});
            
            //embed creation
            const embed = new EmbedBuilder()
                .setTitle(`Crusades Report`)
                .setDescription(`Crusades available on the ${interaction.guild.name} server`)
                .setColor('Random');
            
            for (const crusade of crusades){
                embed.addFields(
                    {name: `🔸 ${crusade.name}`, value: ' '}
                )
            }

            if (crusades) 
                interaction.editReply({embeds: [embed]});
            else
                interaction.editReply(`❗ There are no active crusades for this server`)

        } catch (err){
            console.log(`Error in listCrusades\n ${err}`);
            interaction.editReply(`A problem occured generating crusades report`);
        }
    }
}