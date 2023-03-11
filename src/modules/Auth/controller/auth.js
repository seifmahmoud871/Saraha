import userModel from "../../../../DB/model/user.model.js";
import { generateToken, verifyToken } from "../../../../utils/generateAndVerifyToken.js";
import { compare, hash } from "../../../../utils/hashAndCompare.js";
import sendEmail from "../../../../utils/sendEmail.js";
import { loginSchema, signUpSchema } from "../auth.validation.js";
export const getAuthModule = (req, res, next) => {
    return res.json({ message: "auth module" });
}

export const signUp = async (req, res, next) => {

    console.log(req.protocol);
    console.log(req.headers);

    const { userName, email, password } = req.body;
    console.log({ userName, email, password });

    const find = await userModel.findOne({ email });

    if (find) {
        return res.json({ message: "Email already existed" });
    }
    console.log("habal1");
    const token = generateToken({payload:{email},signature:process.env.EMAIL_TOKEN,expiresIn:60*5})
    const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    console.log({email});
    const refreshToken = generateToken({payload:{email},signature:process.env.EMAIL_TOKEN,expiresIn:60*60*24*30})
    const refreshLink=`${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refreshToken}`

    const html=`<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
    <style type="text/css">
    body{background-color: #88BDBF;margin: 0px;}
    </style>
    <body style="margin:0px;"> 
    <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
    <tr>
    <td>
    <table border="0" width="100%">
    <tr>
    <td>
    <h1>
        <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
    </h1>
    </td>
    <td>
    <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
    <tr>
    <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
    <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
    </td>
    </tr>
    <tr>
    <td>
    <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
    </td>
    </tr>
    <tr>
    <td>
    <p style="padding:0px 100px;">
    </p>
    </td>
    </tr>
    <tr>
    <td>
    <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
    </td>
    </tr>
    <td>
    <br>
    <br>
    <br>
    <a href="${refreshLink}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Send New Verification</a>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
    <tr>
    <td>
    <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
    </td>
    </tr>
    <tr>
    <td>
    <div style="margin-top:20px;">
    <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
    
    <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
    </a>
    
    <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
    </a>

    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </body>
    </html>`
    const info=sendEmail({to:email,subject:"Confirm Email",html:html});
    if(!info){
        return next(new Error("Rejected email" , {cause:400}));
    }
    
    const hashPassword = hash({ plaintext: password });
    const creatUser = await userModel.create({ userName, email, password: hashPassword });

    return res.json({ message: "Done", creatUser })



}

export const confirmEmail =async (req,res,next)=>{

    const {token}=req.params;
    const decoded= verifyToken({token,signature:process.env.EMAIL_TOKEN});

    const user = await userModel.updateOne({email:decoded.email},{confirmEmail:true});
    return user.modifiedCount ? res.status(200).json({message:"Done"}):res.status(404).send("Not register account");


}


export const newConfirmEmail =async (req,res,next)=>{

    const {token}=req.params;
    const {email}= verifyToken({token,signature:process.env.EMAIL_TOKEN});
 
    const newtoken = generateToken({payload:{email},signature:process.env.EMAIL_TOKEN,expiresIn:60*2})
    const link=`${req.protocol}://${req.headers.host}/auth/confirmEmail/${newtoken}`

    const refreshLink=`${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${token}`;

    const html=`<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
    <style type="text/css">
    body{background-color: #88BDBF;margin: 0px;}
    </style>
    <body style="margin:0px;"> 
    <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
    <tr>
    <td>
    <table border="0" width="100%">
    <tr>
    <td>
    <h1>
        <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
    </h1>
    </td>
    <td>
    <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
    <tr>
    <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
    <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
    </td>
    </tr>
    <tr>
    <td>
    <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
    </td>
    </tr>
    <tr>
    <td>
    <p style="padding:0px 100px;">
    </p>
    </td>
    </tr>
    <tr>
    <td>
    <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
    </td>
    </tr>
    <tr>
    <td>
    <br>
    <br>
    <br>
    <a href="${refreshLink}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Send New Verification</a>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
    <tr>
    <td>
    <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
    </td>
    </tr>
    <tr>
    <td>
    <div style="margin-top:20px;">

    <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
    
    <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
    </a>
    
    <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
    </a>

    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </body>
    </html>`
    const info=sendEmail({to:email,subject:"Confirm Email",html:html});
    if(!info){
        return next(new Error("Rejected email" , {cause:400}));
    }

    return res.status(200).send("<p>Done Please Check Your Email</p>")

}



export const login = async (req, res, next) => {


    const { email, password } = req.body;
    console.log({ email, password });
    const user = await userModel.findOne({ email });

    if (!user) {
        return next(new Error("Email not exist",{cause:404}));
    }
    if(!user.confirmEmail){
        return next(new Error("You have to confirm your email first",{cause:404}));
    }

    const match = compare({ plaintext: password, hashValue: user.password });

    if (!match) {
        return res.json({ message: "In-valid password" });
    }

    const token = generateToken({ payload: { id: user._id, isLoggedIn: true, role: user.role } })
    user.status = "online";
    await user.save();
    return res.json({ message: "Done", token })

} 


