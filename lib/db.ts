import mongoose from "mongoose";

export const connectToDb = async ()=>{
  try{
    mongoose.connect(process.env.MONGO_URL as string).then(()=>{
      console.log(`Connected to db`)
    }).catch(error=> console.log(`Error on connect to db`,error))
  }catch(error){
    console.log(`Error on connect to db`,error)
  }
}