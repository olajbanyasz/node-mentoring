import express, { Router } from 'express';
import {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
} from '../controllers/user-controller';

import { userSchema } from '../models/user';
import { createValidator } from 'express-joi-validation';
const userValidator = createValidator();

const userRouter: Router = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.delete('/users/:id', deleteUser);
userRouter.post('/users', userValidator.body(userSchema), addUser);
userRouter.put('/users/:id', updateUser);

export default userRouter;
