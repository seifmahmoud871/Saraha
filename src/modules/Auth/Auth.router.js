import Router from "express";
import { errorHandler } from "../../../utils/errorHandling.js";
import { validation } from "../../middleware/validation.js";
import { loginSchema, signUpSchema } from "./auth.validation.js";
import * as authController from "./controller/auth.js"
const router=Router();

router.get('/',authController.getAuthModule);

router.post('/signup',validation(signUpSchema),errorHandler(authController.signUp));
router.post('/login',validation(loginSchema),errorHandler(authController.login));
router.get('/confirmEmail/:token',errorHandler(authController.confirmEmail))
router.get('/newConfirmEmail/:token',errorHandler(authController.newConfirmEmail))

export default router;