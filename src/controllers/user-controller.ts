import { Request, Response, NextFunction } from 'express';
import { users, User } from '../db/users'

export const getUsers = (req: Request, res: Response, next: NextFunction): void => {
    const { loginSubstring, limit } = req.query;
    const sortedUsers : User[] = users.sort((a : User, b: User)=>(a.login > b.login) ? 1 : ((b.login > a.login) ? -1 : 0));
    const sortedAndFilteredUsers : User[] =  typeof(loginSubstring) === 'string' ? 
            sortedUsers.filter(user => user.login.replace(/ /g,'').toLowerCase().includes(loginSubstring.replace(/ /g,'').toLowerCase())) : 
            sortedUsers;
    const responseData = !isNaN(Number(limit)) ? sortedAndFilteredUsers.slice(0, Number(limit)) : sortedAndFilteredUsers;
    res.status(200).json(responseData.filter(user => !user.isDeleted));
    next();
};

export const getUser = (req: Request, res: Response, next: NextFunction): void => {
    const responseData : User | undefined = users.find(user => (user.id === req.params.id));
    res.status(200).json(responseData);
    next();
};

export const deleteUser = (req: Request, res: Response, next: NextFunction): void => {
    const selectedUser : User | undefined = users.find(user => (user.id === req.params.id));
    if (selectedUser) {
        selectedUser.isDeleted = true;
        res.status(200).json('deleted success');
    } else {
        res.status(404).json('delete failed');
    }
    next();
};
