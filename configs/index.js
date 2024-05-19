import mongoose from 'mongoose';
const ConnectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return false;
        }
        await mongoose.connect(process.env.DB_URL_LOCAL);
    } catch (error) {
        console.log(error);
    }
}

export default ConnectToDB;