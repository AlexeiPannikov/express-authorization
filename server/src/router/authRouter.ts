import Router from 'express';
import userController from '../controllers/UserController';
import {body} from 'express-validator';
import authMiddleware from "../middlewares/auth-middleware";

const authRouter = Router();

authRouter.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 30}),
    userController.registration);
authRouter.post('/login', userController.login);
authRouter.post('/logout', userController.logout);
authRouter.get('/activate/:link', userController.activate);
authRouter.get('/refresh', userController.refresh);
authRouter.get('/users', authMiddleware, userController.getUsers);

export default authRouter;