import express, { Router } from 'express';
import { getUsers, getUser, deleteUser, addUser, updateUser } from '../controllers/user-controller';

const userRouter : Router = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.delete('/users/:id', deleteUser);
userRouter.post('/users', addUser);
userRouter.put('/users/:id', updateUser);

export default userRouter;
