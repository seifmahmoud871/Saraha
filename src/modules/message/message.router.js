import Router from "express";
import { errorHandler } from "../../../utils/errorHandling.js";
import { auth } from "../../middleware/auth.middleware.js";
import {validation} from "../../middleware/validation.js";
import * as messageController from "./controller/message.js"
import * as validators from "./message.validation.js"
const router=Router();

router.get('/',auth,errorHandler(messageController.getMessageModule));
router.post('/:receiverId',validation(validators.messageValSchema),errorHandler(messageController.sendMessage));
router.delete('/:id',validation(validators.messageDelete),auth,errorHandler(messageController.deleteMessage))



export default router;