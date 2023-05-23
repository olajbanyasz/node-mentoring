import { User } from 'src/db/users';
import UserModel from '../models/user.model';
import sequelize from 'sequelize';

async function createUser (login: string, password: string, age: number) {
    await UserModel.create({login,password,age}, {
        fields:['login','password','age','isDeleted']
    });
};

async function getAllUsers () {
    const users = await UserModel.findAll({
        attributes: ['id','login','password','age','isDeleted']
    })
    return users;
};

async function getSortedUserList(loginSubstring: string, limit: string) {
    const users = await UserModel.findAll({
        where: {
            login: sequelize.where(sequelize.fn('LOWER', sequelize.col('login')), 'LIKE', '%' + loginSubstring.toLowerCase() + '%')
        },
        order: [['login', 'ASC']],
        limit: Number(limit),
        attributes: ['id','login','password','age','isDeleted']
    })
    return users;
}

async function deleteUser (id: number) {
    try {
        const status = await UserModel.destroy({ where:{ id }});
        return status;
    } catch (error: unknown) {
        console.error(error);
    }
};

async function updateUser (user : User) {
    const { login, password, age, id, isDeleted } = user;
    try {
        await UserModel.update({ login, password, age, isDeleted, id }, {where: {id}});
    } catch (error: unknown) {
        console.error(error);
    }
};

async function getUser (id: number) {
    const user = await UserModel.findByPk( id, {
        attributes: ['id','login','password','age','isDeleted']
    });
    return user;
};

export default class UserService {
    createUser = createUser;
    getAllUsers = getAllUsers;
    getSortedUserList = getSortedUserList;
    deleteUser = deleteUser;
    getUser = getUser;
    updateUser = updateUser;
};
