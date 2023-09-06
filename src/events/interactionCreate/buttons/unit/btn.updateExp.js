const {Unit, OOB} = require('../../../../data/schemas.js' )
const {ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');
const client = require('../../../../index.js');
const updateExp = require('../../../../helpers/OrdersOfBattle/units/updateExp.js');

module.exports = async (interaction) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith('update-exp_')) return;

    let unitId = interaction.customId.split('_')[1];
    let oobId = interaction.customId.split('_')[2];

    let oob, unit;

    //get oob and unit
    try{
        oob = await OOB.findOne({_id: oobId});

        for (u of oob.units){
            if (u._id == unitId){
                unit = u;
            }
        }
    }
    catch (err){
        console.log(`Error in generateUnitReport\n${err}`);
        interaction.editReply(`++There was a problem communing with the machine spirits++`);
        return;
    }

    let curExp = unit.xp;
    let curRank = unit.rank;

    let modal = new ModalBuilder()
    .setCustomId(`upd-exp_${oobId}_${unitId}`) 
    .setTitle(`Current exp: ${curExp}`)

    let uExpChange = new TextInputBuilder()
    .setCustomId(`xp-change`)
    .setLabel('Update Exp (remove exp w/ negative number)')
    .setPlaceholder('Enter the amount of exp to add/remove')
    .setStyle(TextInputStyle.Short)
    .setMaxLength(3)
    .setRequired(true);

    let ar0 = new ActionRowBuilder().addComponents(uExpChange);
    modal.addComponents(ar0);

    await interaction.showModal(modal);

    // client.on('interactionCreate', async (modalSubmit) => {
    //     if (!modalSubmit.isModalSubmit) return;
    //     if (modalSubmit.customId != `update-exp_${oobId}_${unitId}`) return;
    //     await modalSubmit.deferReply({ephemeral: true});

    //     // Get the data entered by the user
    //     let xpDif = modalSubmit.fields.getTextInputValue("xp-change");
    //     xpDif = parseInt(xpDif);

    //     let result = await updateExp(oobId, unitId, xpDif);
    //     if (result.r){
            
    //         let message = `**${result.unit.name}'s experience has been updated by ${xpDif} experience points.**\n*-Current exp: ${result.unit.xp}*\n*-Current rank: ${result.unit.rank}*`;
    //         modalSubmit.editReply({content: message, ephemeral: true});
    //         return;
    //     }
    //     else {
    //         modalSubmit.editReply({content: `++There was a problem updating the experience++`, ephemeral: true});
    //         return;
    //     }
    // });
}