import mongoose from "mongoose";


const connectDB =async ()=>{
   return await mongoose.connect(process.env.DB_LOCAL).then(
    res=>{
        console.log("DataBase Connected .................");
    }
).catch(err =>{console.log("DataBase Connected field .................")});
}
export default connectDB;