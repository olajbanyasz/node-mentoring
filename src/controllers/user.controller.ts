import UserService from '../services/user.service';
import { Request, Response } from 'express';
import { User } from 'src/db/users';
import { StatusCodes } from 'http-status-codes';

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

export async function getUsers(req: Request, res: Response) {
  const loginSubstring = typeof(req.query.loginSubstring) === 'string' ? req.query.loginSubstring : '';
  const limit = typeof(req.query.limit) === 'string' && typeof(Number(req.query.limit)) === 'number'? req.query.limit : '';
  if (loginSubstring || limit) {
    const users : User[] | any[] = await userService.getSortedUserList(loginSubstring, limit);
    res.status(StatusCodes.OK).json(users);
  } else {
    const users : User[] | any[] = await userService.getAllUsers();
    res.status(StatusCodes.OK).json(users);
  }
}

export async function addUser(req: Request, res: Response): Promise<void> {
  const login: string = req.body.login;
  const password: string = req.body.password;
  const age: number = req.body.age;

  await userService.createUser(login, password, age);
  res.status(StatusCodes.OK).json('New user is created');
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const userId = Number(req.params.id);
  await userService.deleteUser(userId);
  res.status(StatusCodes.OK).json('User is deleted');
}

export async function getUser(req: Request, res: Response): Promise<void> {
  const userId = Number(req.params.id);
  try {
    const user = await userService.getUser(userId);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json('User does not exist');
  }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  const userId = Number(req.params.id);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: User | any = await userService.getUser(userId);
  const updatedUser = Object.assign({}, user, req.body);
  await userService.updateUser(updatedUser);
  res.status(StatusCodes.OK).json('Update success');
}
