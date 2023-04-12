const mongoose = require("mongoose");
const colors = require("colors");


mongoose.set('strictQuery',true);

const connectDB = async()=>{
    try {
        
        await mongoose.connect(process.env.MONGO_DB);
        console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
      } catch (error) {
        console.log(`Mongodb Server Issue ${error}`.bgRed.white);
    }
}

module.exports = connectDB;