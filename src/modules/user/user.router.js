import Router from "express";
import * as userController from "./controller/user.js"
const router=Router();
import { auth } from "../../middleware/auth.middleware.js";
import { errorHandler } from "../../../utils/errorHandling.js";
import * as validators from "./user.validation.js"
import {validation} from "../../middleware/validation.js";
//  router.get('/',userController.getUserModule);

 router.get('/',auth,errorHandler(userController.profile));
router.patch('/password',validation(validators.updatePassword),auth,errorHandler(userController.updatePassword));
router.get('/:id/profile',validation(validators.shareProfile),errorHandler(userController.shareProfile))


export default router;