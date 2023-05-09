const mongoose = require('mongoose');

async function connect_db() {
    
    try{
        await mongoose.connect(process.env.DB_URI).then(
            console.log(`✅ - DB connected successfully! Huzzah! - ✅`)
        )
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {connect_db}