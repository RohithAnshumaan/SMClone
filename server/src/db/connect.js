import mongoose from 'mongoose';

export const connectDB = async(url) => {
    await mongoose.connect(url)
    .then(()=>{
        console.log("db connected");
    })
    .catch((err)=>{
        console.log(err);
    })
}