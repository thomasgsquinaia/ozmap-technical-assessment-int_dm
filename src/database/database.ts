import mongoose from "mongoose";

const init = async function () {
    try {
        console.log('Connecting database');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected');
    } 
    catch (err) {
        throw(err);
    }
}

export default init();