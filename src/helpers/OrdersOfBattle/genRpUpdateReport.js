const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle}  = require ('discord.js');
const {OOB} = require('../../data/schemas')

module.exports = async (interaction, oobId, rpChange) => {
    await interaction.deferReply();
    try{
        let oob = await OOB.findOne({_id: oobId});

        if (!oob) throw(`Unable to get Order of Battle from DB`);

        const embed = new EmbedBuilder()
        .setTitle('Requisition Points Updated')
        .setDescription(`for ${oob.name}`)
        .setColor(`Random`)
        .addFields(
            {name: 'Current RP', value: `${oob.requisitionPoints}`, inline: true},
            {name: ' ', value: `\`*RP updated by ${rpChange}*\``, inline: true},
        )
        .setFooter({text: `by @${interaction.user.username}`})

        interaction.editReply({embeds:[embed]});

    }
    catch (err) {
        console.log(`error in genRpUpdateReport:\n${err}`);
        interaction.editReply(`++Error reporting OoB requisition Point update++`);
    }

    return;
}