const {connect_db} = require('../../data/mongo-connection.js');

module.exports = () => {
    connect_db();
}