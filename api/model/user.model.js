import mongoose from "mongoose";

let usermodel= new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
},{timestamps:true})

export const usershm=mongoose.model('users',usermodel)