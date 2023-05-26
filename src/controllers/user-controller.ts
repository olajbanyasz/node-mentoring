import { Request, Response } from 'express';
import { users, User } from '../db/users';
import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';

export const getUsers = (req: Request, res: Response): void => {
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
  res
    .status(StatusCodes.OK)
    .json(responseData.filter((user) => !user.isDeleted));
};

export const getUser = (req: Request, res: Response): void => {
  const user: User | undefined = users.find(
    (user) => user.id === req.params.id,
  );
  if (user) {
    res.status(StatusCodes.OK).json(user);
  } else {
    res.status(StatusCodes.NOT_FOUND).json('User does not exist');
  }
};

export const deleteUser = (req: Request, res: Response): void => {
  const user: User | undefined = users.find(
    (user) => user.id === req.params.id,
  );
  if (user) {
    user.isDeleted = true;
    res.status(StatusCodes.OK).json('Deleted success');
  } else {
    res.status(StatusCodes.NOT_FOUND).json('User does not exist');
  }
};

export const addUser = (req: Request, res: Response): void => {
  const newUser: User = {
    id: uuidv4(),
    isDeleted: false,
    ...req.body
  };

  users.push(newUser);
  res.status(StatusCodes.CREATED).json('New user is created');
};

export const updateUser = (req: Request, res: Response): void => {
  const user: User | undefined = users.find(
    (user) => user.id === req.params.id,
  );

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json('User does not exist');
  } else {
    users.map((u) => {
      if (u.id === user.id) return { ...req.body };
    });
    res.status(StatusCodes.OK).json('User is updated');
  }
};
