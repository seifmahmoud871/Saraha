import joi from 'joi'
import { generalFields } from '../../middleware/validation.js';


export const signUpSchema ={

    body:joi.object({
        userName:joi.string().alphanum().required(),
        email:generalFields.email,
        password:generalFields.password,
        cPassword:generalFields.cPassword,
    }).required(),
    
}


export const loginSchema = joi.object({

    email:joi.string().email().required(),
    password:joi.string().pattern(RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
 

}).required();