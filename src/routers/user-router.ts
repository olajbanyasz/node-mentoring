import express, { Router } from 'express';
import {
  addUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser
} from '../controllers/user.controller';

const userRouter: Router = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.delete('/:id', deleteUser);
userRouter.post('/', addUser);
userRouter.put('/:id', updateUser);

export default userRouter;
