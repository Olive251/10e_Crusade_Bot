const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle}  = require ('discord.js');

module.exports = async (interaction, oob) => {
    if (!oob){
        interaction.editReply(`❗ - Unable to find "${interaction.options.get('name').value}" in your orders of battle for this server`);
        return;
    }

    try{
        const embed = new EmbedBuilder()
        .setTitle(oob.name)
        .setDescription(`${interaction.member}'s Order of Battle`)
        .setColor(`Random`)

        embed.addFields(
            {name: 'Win Tally', value: `Wins: ${oob.tally.w} | Draws: ${oob.tally.d} | Losses: ${oob.tally.l}`, inline: false},
            {name: 'Requisition Points', value:`${oob.requisitionPoints}`, inline:true},
            {name: 'Order Size', value:`1000/${oob.maxSize}`, inline:true},
        )

        if (oob.units.length > 0){
            embed.addFields(
                {name: 'Units', value: `Units not yet implemented...`}
            );
        }
        else {
            embed.addFields(
                {name: 'Units', value: `Units not yet implemented...`}
            );
        }

        if (oob.loreDoc){
            embed.addFields({name: 'Lore Doc', value:`${oob.loreDoc}`});
        }
        

        //buttons
        const modifyOobRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Tally Win')
                .setStyle(ButtonStyle.Primary)
                .setCustomId(`add_win_${oob._id}`),
            new ButtonBuilder()
                .setLabel('Tally Draw')
                .setStyle(ButtonStyle.Primary)
                .setCustomId(`add_draw_${oob._id}`),
            new ButtonBuilder()
                .setLabel('Tally Loss')
                .setStyle(ButtonStyle.Primary)
                .setCustomId(`add_loss_${oob._id}`)
        )

        interaction.editReply({embeds: [embed], components: [modifyOobRow]});

    }
    catch (err) {
        console.log(`Error in generateOOBReport:\n${err}`);
        
        return false;
    }
}