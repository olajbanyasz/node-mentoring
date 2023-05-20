import { Request, Response, NextFunction } from 'express';
import { users, User } from '../db/users';
import { v4 as uuidv4 } from 'uuid';
import { userSchemaWithId } from '../models/userSchema';

export const getUsers = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { loginSubstring, limit } = req.query;
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
  res.status(200).json(responseData.filter((user) => !user.isDeleted));
  next();
};

export const getUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const selectedUser: User | undefined = users.find(
    (user) => user.id === req.params.id,
  );
  if (selectedUser) {
    res.status(200).json(selectedUser);
  } else {
    res.status(400).json('User does not exist');
  }
  next();
};

export const deleteUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const selectedUser: User | undefined = users.find(
    (user) => user.id === req.params.id,
  );
  if (selectedUser) {
    selectedUser.isDeleted = true;
    res.status(200).json('Deleted success');
  } else {
    res.status(400).json('User does not exist');
  }
  next();
};

export const addUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const newUser: User = {
    id: uuidv4(),
    login: req.body.login,
    password: req.body.password,
    isDeleted: false,
    age: req.body.age,
  };

  const { error } = userSchemaWithId.validate(newUser);

  if (error) {
    res.status(400).json(error.details);
  } else {
    users.push(newUser);
    res.status(200).json('New user is created');
  }
  next();
};

export const updateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const index: number = users.findIndex((user) => user.id === req.params.id);

  if (index === -1) {
    res.status(400).json('User does not exist');
  } else {
    const user: User = users[index];
    const requestData: Partial<User> = {
      login: req.body.login || user.login,
      password: req.body.password || user.password,
      age: req.body.age || user.age,
    };
    const updatedUser: User = Object.assign({}, users[index], requestData);
    const { error } = userSchemaWithId.validate(updatedUser);

    if (error) {
      res.status(400).json(error.details);
    } else {
      users[index] = updatedUser;
      res.status(200).json('User is updated');
    }
  }

  next();
};
