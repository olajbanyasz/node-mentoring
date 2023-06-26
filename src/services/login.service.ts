import UserModel from '../models/user.model';

async function login (payload: { login: string, password: string }) {
    return UserModel.findOne({ where: payload });
};

export default class LoginService {
  login = login;
};
