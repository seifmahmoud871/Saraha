import messageModel from "../../../../DB/model/message.model.js";
import userModel from "../../../../DB/model/user.model.js";

export const getMessageModule=async(req,res,next)=>{
    const messages=await messageModel.find({recevierId:req.user._id});
    return res.json({message:"Done",messages});
}

export const sendMessage=async(req,res,next)=>{

    const {receiverId}=req.params;
    const {message}=req.body;
    console.log(receiverId);

    const user=await userModel.findById(receiverId);

    if(!user){
        return next(new Error("In-valid account id",{cause:404}));
    };

    const newMessage =await messageModel.create({recevierId:receiverId,message});
    return res.status(201).json({message:"Done",newMessage});
}


export const deleteMessage = async(req,res,next)=>{
    const {id}=req.params;
    console.log({id});
    const message =await messageModel.deleteOne({_id:id,receiverId:req.user._id});
    return message.deletedCount ? res.status(200).json({message:"Done"}):next(new Error ('Invalid messageId or userId',{cause:400}))
}