var mongoose = require('mongoose'),
 Schema = mongoose.Schema

const unitSchema = new Schema({
    name: String,
    crusadePoints: Number,
    xp: Number,
    killCount: Number,
})

const orderOfBattleSchema = new Schema({
    name: String,
    units: [unitSchema],
    tally: {w: Number, l: Number},
    guildID: Number,
    userID: Number,
})

const allianceSchema = new Schema({
    name: String,
    forces: [String], //oob._id
})

const crusadeSchema = new Schema({
    name: String,
    guildID: Number,
    description: String,
    players: [Number],
    alliances: [allianceSchema],
    externalCrusadeDoc: String,
})

var Unit = mongoose.model('Unit', unitSchema);
var OOB = mongoose.model('OOB', orderOfBattleSchema);
var Alliance = mongoose.model('Alliance', allianceSchema);
var Crusade = mongoose.model('Crusade', crusadeSchema);

module.exports = {
    Unit,
    OOB,
    Alliance,
    Crusade
  };