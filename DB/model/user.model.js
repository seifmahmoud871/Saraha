
import mongoose, { model, Schema } from "mongoose";


const userSchema = new Schema({

    firstName:String,
    lastName:String,
     
    userName:{
        type:String,
        required:true,
    }
    ,email:{
        type:String,
        required:true,
        unique:true,
    },
    age:Number
    ,
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        default:'male',
        enum:['male','female'],
    },
    status:{
        type:String,
        default:'offline',
        enum:['offline','online','blocked'],
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin'],
    },
    phone:{
        type:String,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    }

},{
    timestamps:true,
})

const userModel= mongoose.models.User || model('User',userSchema);

export default userModel;