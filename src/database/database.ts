import mongoose from "mongoose";

const init = async function () {
    try {
        console.log('Connecting database');
        await mongoose.connect('mongodb://mongo:27017',{
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
        });
        console.log('Database connected');
    } 
    catch (err) {
        throw(err);
    }
}

export default init();