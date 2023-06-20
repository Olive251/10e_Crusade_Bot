var mongoose = require('mongoose'),
Schema = mongoose.Schema

const unitSchema = new Schema({
    name: String,
    type:String,
    pointsValue: Number,
    crusadePoints: Number,
    xp: Number,
    killCount: Number,
    rank: {
        type: String,
        enum: ['Battle-Ready', 'Blooded', 'Battle-Hardened', 'Heroic', 'Legendary']
    },
})

const orderOfBattleSchema = new Schema({
    name: String,
    units: [unitSchema],
    tally: {w: Number, d: Number, l: Number},
    guildID: Number,
    userID: Number,
    requisitionPoints: Number,
    maxSize: Number,
    loreDoc: String,
    allianceMembership: String,
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