import joi from 'joi'
const dataMethod=["body","query","params","headers"];

export const generalFields={
    password:joi.string().pattern(RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    email:joi.string().email().required(),
    cPassword:joi.valid(joi.ref('password')).required(),
}

export const validation=(schema)=>{


    return(req,res,next)=>{

        const validationArr=[];

        dataMethod.forEach(key=>{
            if(schema[key]){
                const validation =schema[key].validate(req[key],{abortEarly:false});
                if(validation.error){
                    validationArr.push(validation.error.details);
                }
                
            }
        });

        if(validationArr.length>0){
            return res.json({message:"validation Error",validationArr})
        }
        else
            return next();
        
    } 


}

// export default validation;

