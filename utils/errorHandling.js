
export const errorHandler = (fn)=>{
    return (req,res,next) =>{
        fn(req,res,next).catch(error=>{
            return next(new Error(error));
        })
    }
}

export const globalErroHandling=(err,req,res,next)=>{
    if(err){
        return res.json({message:err.message,stack:err.stack});
    }
}