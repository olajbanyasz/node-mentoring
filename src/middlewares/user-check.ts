import UserModel from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userSchemaWithId } from '../models/userSchema';

function userCheck() {
  return async function (req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;
    const user = await UserModel.findByPk(id);

    const { error } = userSchemaWithId.validate(user?.dataValues);

    if (error) {
      res.status(StatusCodes.NOT_FOUND).json('User does not exist');
    } else {
      next();
    }
  };
}

export default userCheck;
