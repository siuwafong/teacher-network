const mongoose = require('mongoose')
const config = require('config')
const dotenv = require('dotenv');
dotenv.config();
const db =  process.env.mongoURI


const connectDB = async () => {
    try {
       await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
       });
       console.log('MongoDB Connected') 
    } catch (err) {
        console.error(err.message)
        // process.exit(1) will escape the process (i.e., make the connection fail)
        // Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB;