const {EmbedBuilder}  = require ('discord.js');

module.exports = async (interaction, oob) => {
    try{

        const embed = new EmbedBuilder()
        .setTitle('Win/Loss Tally Updated')
        .setDescription(`for ${oob.name}`)
        .setColor(`Random`)
        .addFields(
            {name: ' ', value: `Wins: ${oob.tally.w} | Draws: ${oob.tally.d} | Losses: ${oob.tally.l}`, inline: false},
        )
        .setFooter({text:`by @${interaction.user.username}`})

        interaction.reply({embeds: [embed]});
    }
    catch (err) {
        console.log(`Error in tallyUpdateReport:\n${err}`)
        return false;
    }
}