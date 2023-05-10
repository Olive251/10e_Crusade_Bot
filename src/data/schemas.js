var mongoose = require('mongoose'),
 Schema = mongoose.Schema

const unitSchema = new Schema({
    name: String,
    xp: Number,
    killCount: Number,
})

const orderOfBattleSchema = new Schema({
    name: String,
    oobID: String,
    units: [unitSchema],
    tally: {w: Number, l: Number},
    guildID: String,
    userID: String,
})

const allianceSchema = new Schema({
    name: String,
    allianceID: String,
    forces: [String],
    guildID: String,
    members: [String],
})

const crusadeSchema = new Schema({
    name: String,
    guildID: Number,
    alliances: [allianceSchema]
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