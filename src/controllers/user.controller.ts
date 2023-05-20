import UserService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { userSchema } from '../models/userSchema';
import { User } from 'src/db/users';

const userService = new UserService();

export async function getUsers (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const loginSubstring  = req.query.loginSubstring;
    const limit = req.query.limit;
    const users : User[] | any[] = await userService.getAllUsers();
    if (loginSubstring || limit) {
        const sortedUsers: User[] = users.sort((a: User, b: User) => a.login > b.login ? 1 : b.login > a.login ? -1 : 0);
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
      res.status(200).json(responseData.filter((user) => !user.isDeleted));
    } else {
        res.status(200).json(users);
    }
    next();
};

export async function addUser (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {

    const login : string = req.body.login;
    const password : string = req.body.password;
    const age: number = req.body.age;

    const { error } = userSchema.validate(req.body);

    try {
        if (error) {
            res.status(400).json(error.details);
        } else {
            await userService.createUser(login,password,age);
            res.status(200).json('New user is created');
        }
    } catch (error) {
        console.error(error);
    }
    next();
};

export async function deleteUser (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const userId = Number(req.params.id);
    try {
        const status = await userService.deleteUser(userId);
        if ( status ) {
            res.status(200).json('Deleted success');
        } else {
            res.status(400).json('User does not exist');
        }
    } catch ( error ) {
        res.status(400).json('User does not exist');
    }
    next();
};

export async function getUser (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const userId = Number(req.params.id);
    try {
        const user = await userService.getUser(userId);
        res.status(200).json(user);
    } catch ( error ) {
        res.status(400).json('User does not exist');
    }
    next();
  };

  export async function updateUser (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const userId = Number(req.params.id);
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const user: User | any = await userService.getUser(userId);
        const updatedUser = Object.assign({}, user, req.body);
        await userService.updateUser(updatedUser);
        res.status(200).json('Update success');
    } catch ( error ) {
        res.status(400).json('User does not exist');
    }
    next();
};