import userModel from "../../../../DB/model/user.model.js";
import { compare, hash } from "../../../../utils/hashAndCompare.js";

export const profile=async(req,res,next)=>{

    const user=await userModel.findById(req.user._id);

    return res.json({message:"Done",user});
}

export const updatePassword=async(req,res,next)=>{

    const {oldPassword,newPassword}=req.body;
    const user =await userModel.findById(req.user._id);
    const match = compare({plaintext:oldPassword,hashValue:user.password});
    if(!match){
        return next(new Error('Invalid old password',{cause:400}));
    }
    
    const newHashPassword = hash({plaintext:newPassword});
    user.password=newHashPassword;
    await user.save();

    return res.status(200).json({message:"Done"});

}


export const shareProfile = async(req,res,next)=>{
    const user=await userModel.findById(req.params.id).select('userName email firstName lastName profilePic');

    return user?res.status(200).json({message:"Done",user}):next (new Error("In-valid account Id",{cause:404}))

}