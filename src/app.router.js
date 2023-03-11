
import authRouter from './modules/Auth/Auth.router.js'
import userRouter from './modules/user/user.router.js'
import messageRouter from './modules/message/message.router.js'
import connectDB from '../DB/connection.js'
import { globalErroHandling } from '../utils/errorHandling.js'
const initApp=(app,express)=>{

    // Convert buffer data
    app.use(express.json({}));
    app.use('/auth',authRouter);
    app.use('/user',userRouter);
    app.use('/message',messageRouter);

    app.all('*',(req,res,next)=>{
        return res.json({message:"In-valid Routing"});
    })

    app.use(globalErroHandling);
    connectDB();
    
}

export default initApp;