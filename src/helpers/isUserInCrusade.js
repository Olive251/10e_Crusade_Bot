const {Crusade} = require('../data/schemas');

module.exports = (crusade, userId) => {
    return crusade.players.includes(userId);
}