import mongoose from 'mongoose'

const UserSchema= new mongoose.Schema({
    userEmail:{
        type:String,
        require:true
    }
})
