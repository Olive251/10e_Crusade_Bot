const {Crusade, Alliance, OOB} = require('../../../data/schemas.js');
const addOobToAlliance = require('../../../helpers/Alliance/addOobToAlliance.js');
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder}  = require ('discord.js');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.includes('join-alliance_')) return;

    try{
        let cId = interaction.customId.split('_');
        let pCrusade = await Crusade.findOne({_id: cId[1]});
        var alliance;
        for (al of pCrusade.alliances){
            if(al._id == cId[2]){
                alliance = al;
            }
        }
        
        //Get user's list of available Orders of Battle
        //Put those orders in a select menu
        let oobs = await OOB.find({userID: interaction.user, guildID: interaction.guildId});
        
        let slRow = new ActionRowBuilder()
        let slct = new StringSelectMenuBuilder()
        .setCustomId('oob-select')
        .setPlaceholder(`Which Order of Battle will join the ${alliance.name}?`)
        
        var openOobs = [];
        for (const oob of oobs){
            if (!oob.allianceMembership){
                openOobs.push(oob);
            }
        }
        
        if (openOobs.length < 1){
            slct.addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel(`You have no free orders of battle...`)
                .setValue(`join-alliance_noObb`)
            )
        }
        else {
            for (const oob of openOobs){
                if (!oob.allianceMembership){
                    slct.addOptions(
                        new StringSelectMenuOptionBuilder()
                        .setLabel(`${oob.name}`)
                        .setValue(`join-alliance_${oob._id}`)
                    )
                }
            }

        }

        slRow.addComponents(slct);

        nRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel(`or create a new order of battle`)
            .setStyle(ButtonStyle.Secondary)
            .setCustomId(`new-oob_`)
        )
        
        interaction.reply({components: [slRow, nRow], ephemeral: true});

    }
    catch (err) {
        console.log(`Error in btn.JoinAlliance\n${err}`);
        interaction.reply('++There was a problem communing with the machine spirits');
    }
}