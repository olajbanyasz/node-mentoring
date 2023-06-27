import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const TOKENKEY : string = process.env.TOKEN_KEY || '';

function generateToken(login: string) {
  const token = jwt.sign({ login }, TOKENKEY, { expiresIn: '1h' });
  return token;
}

async function login(payload: { login: string, password: string }) {
  try {
    const user = await UserModel.findOne({ where: { login: payload.login } });
    if (!user) {
      throw new Error('Invalid username');
    }

    const passwordMatch = await bcrypt.compare(payload.password, user.dataValues.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const token = generateToken(payload.login);
    return token;
  } catch (error) {
    throw new Error('Login failed');
  }
}

export default class LoginService {
  login = login;
};
