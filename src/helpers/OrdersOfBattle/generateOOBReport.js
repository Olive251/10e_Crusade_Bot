const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder}  = require ('discord.js');

module.exports = async (interaction, oob, buttonsOn=true) => {
    if (!oob){
        interaction.editReply(`❗ - Unable to find "${interaction.options.get('name').value}" in your orders of battle for this server`);
        return;
    }

    try{
        const embed = new EmbedBuilder()
        .setTitle(oob.name)
        .setDescription(`${interaction.member}'s Order of Battle`)
        .setColor(`Random`);

        //Add select menu to view units in oob
        let slRow = new ActionRowBuilder();
        let slct = new StringSelectMenuBuilder()
        .setCustomId('unit-select')
        .setPlaceholder(`Select a unit to see details...`);

        let oobSize = 0; //to hold sum of units crusade pts
        if (oob.units.length > 0){
            let units = '';
            for (const u of oob.units){
                units += `- **${u.name}** | ${u.type}\n`;

                //adding to slct menu
                slct.addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel(`${u.name} || ${u.type}`)
                    .setValue(`view-unit_${u._id}_${oob._id}`)
                )

                oobSize += u.crusadePoints;
            }
            embed.addFields(
                {name: `Units`, value:`${units}`}
            )
        }
        else {
            embed.addFields(
                {name: 'Units', value: `This order of battle does not contain any units...`}
            );
        }

        //main embed body
        embed.addFields(
            //{name: 'Win Tally', value: `Wins: ${oob.tally.w} | Draws: ${oob.tally.d} | Losses: ${oob.tally.l}`, inline: false},
            {name: 'Win Tally', value: `Wins: ${oob.tally.w} | Losses: ${oob.tally.l}`, inline: false},
            {name: 'Requisition Points', value:`${oob.requisitionPoints}`, inline:true},
            {name: 'Order Size', value:`${oobSize}/${oob.maxSize}`, inline:true},
        )

        if (oob.loreDoc){
            embed.addFields({name: 'Lore Doc', value:`${oob.loreDoc}`});
        }
        

        //buttons
        if (buttonsOn){
            const modifyTallyRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Tally Win')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId(`add_win_${oob._id}`),
                // new ButtonBuilder()
                //     .setLabel('Tally Draw')
                //     .setStyle(ButtonStyle.Primary)
                //     .setCustomId(`add_draw_${oob._id}`),
                new ButtonBuilder()
                    .setLabel('Tally Loss')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId(`add_loss_${oob._id}`),
                new ButtonBuilder()
                    .setLabel('+1 RP')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId(`add_rp_${oob._id}`),
                new ButtonBuilder()
                    .setLabel('-1 RP')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId(`reduce_rp_${oob._id}`)
            )
    
            const unitsRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Add Unit')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId(`add-unit_${oob._id}`),
                new ButtonBuilder()
                    .setLabel('Remove Unit')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId(`remove-unit_${oob._id}`)
            )
            
            slRow.addComponents(slct);

    
            interaction.editReply({embeds: [embed], components: [slRow, modifyTallyRow, unitsRow]});
        }
        else {
            interaction.editReply({embeds: [embed]});
        }

    }
    catch (err) {
        console.log(`Error in generateOOBReport:\n${err}`);
        
        return false;
    }
}