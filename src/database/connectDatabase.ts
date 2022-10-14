import { connect } from "mongoose";

export const connectDatabase = async()=>{
     connect(process.env.MONGO_URI as string);
     console.log("Connected to DB");
} 