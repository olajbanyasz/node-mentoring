import express, { Router } from 'express';
import { getUsers, getUser, deleteUser } from '../controllers/user-controller';

const userRouter : Router = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.delete('/users/:id', deleteUser);
//userRouter.post('/users/:id', userValidator, userLoginValidator, addUserHandler);
//userRouter.put('/users/:id',, userValidator, userLoginValidator, updateUserHandler);

export default userRouter;
