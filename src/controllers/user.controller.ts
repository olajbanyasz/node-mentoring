import UserService from '../services/user.service';
import { NextFunction, Request, Response } from 'express';
import { User } from '../utils/shapes';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

const userService = new UserService();

export async function getUserList(req: Request, res: Response): Promise<void> {
  const loginSubstring = req.query.loginSubstring;
  const limit = req.query.limit;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const users: User[] | any[] = await userService.getAllUsers();
  if (loginSubstring || limit) {
    const sortedUsers: User[] = users.sort((a: User, b: User) =>
      a.login > b.login ? 1 : b.login > a.login ? -1 : 0,
    );
    const sortedAndFilteredUsers: User[] =
      typeof loginSubstring === 'string'
        ? sortedUsers.filter((user) =>
            user.login
              .replace(/ /g, '')
              .toLowerCase()
              .includes(loginSubstring.replace(/ /g, '').toLowerCase()),
          )
        : sortedUsers;
    const responseData = !isNaN(Number(limit))
      ? sortedAndFilteredUsers.slice(0, Number(limit))
      : sortedAndFilteredUsers;
    res
      .status(StatusCodes.OK)
      .json(responseData.filter((user) => !user.isDeleted));
  } else {
    res.status(StatusCodes.OK).json(users);
  }
}

export async function getUsers(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const loginSubstring = typeof(request.query.loginSubstring) === 'string' ? request.query.loginSubstring : '';
    const limit = typeof(request.query.limit) === 'string' && typeof(Number(request.query.limit)) === 'number'? request.query.limit : '';
    if (loginSubstring || limit) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const users : User[] | any[] = await userService.getSortedUserList(loginSubstring, limit);
      response.status(StatusCodes.OK).json(users);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const users : User[] | any[] = await userService.getAllUsers();
      response.status(StatusCodes.OK).json(users);
    }
  } catch (error) {
    return next(error);
  }
}

export async function addUser(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const login: string = request.body.login;
    const encryptedPassword : string = await bcrypt.hash(request.body.password, 10);;
    const age: number = request.body.age;
    await userService.createUser(login, encryptedPassword, age);
    response.status(StatusCodes.OK).json('New user is created');
  } catch (error) {
    return next(error);
  }
}

export async function deleteUser(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const userId = Number(request.params.id);
    await userService.deleteUser(userId);
    response.status(StatusCodes.OK).json('User is deleted');
  } catch (error) {
    return next(error);
  }
}

export async function getUser(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const userId = Number(request.params.id);
    const user = await userService.getUser(userId);
    response.status(StatusCodes.OK).json(user);
  } catch (error) {
    return next(error);
  }
}

export async function updateUser(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
  const userId = Number(request.params.id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: User | any = await userService.getUser(userId);
  const updatedUser = Object.assign({}, user, request.body);
  await userService.updateUser(updatedUser);
  response.status(StatusCodes.OK).json('Update success');
  } catch (error) {
    return next(error);
  }
}
