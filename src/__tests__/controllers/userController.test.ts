/* eslint-disable no-empty-pattern */
import Express, { json } from 'express';
import request from 'supertest';
import UserModel from '../../models/user.model';
import routers from '../../routers/';
import * as SequelizeFixtures from 'sequelize-fixtures';
import { sq } from '../../data-access/db';
import { StatusCodes } from 'http-status-codes';


jest.mock('../../middlewares/authentication', () =>
  jest.fn(({}, {}, next) => next()),
);
jest.mock('../../middlewares/morganMiddleware', () =>
  jest.fn(({}, {}, next) => next()),
);

const initApp = () => {
  const app = Express();
  app.use(json());
  app.use('/', routers);
  return app;
};

const clearTable = async () => {
  return await UserModel.destroy({ where: {}, force: true });
};

describe('User controller', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await sq.close();
  });

  it('should retrieve a user if /users/{id} route called with GET', async () => {
    const app = initApp();
    const User1 = {
      login: 'User-1',
      password: 'Password1',
      age: 44
    };
    const fixtures = [
      {
        model: 'UserModel',
        data: User1,
      },
    ];
    await SequelizeFixtures.loadFixtures(fixtures, { UserModel } as any);
    const userList = await request(app).get('/users');
    const userId = userList.body.pop().id;
    const response = await request(app).get(`/users/${userId}`);
    expect(response.body.login).toBe('User-1');
  });

  it('should send a message "User does not exist" if /users/{id} route called with GET but not valid id', async () => {
    const app = initApp();
    const userList = await request(app).get('/users');
    const userId = userList.body.pop().id * 5;
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toBe('User does not exist');
  });

  it('should retrieve all users if /users route called with GET', async () => {
    const app = initApp();
    const expextedLogin = 'User-2';
    const User2 = {
      login: 'User-2',
      password: 'Password2',
      age: 44,
    };
    const fixtures = [
      {
        model: 'UserModel',
        data: User2,
      },
    ];
    await clearTable();
    const responseBefore = await request(app).get('/users');
    const userCounterBefore = responseBefore.body.length;
    await SequelizeFixtures.loadFixtures(fixtures, { UserModel } as any);
    const responseAfter = await request(app).get('/users');
    const userCounterAfter = responseAfter.body.length;
    expect(userCounterAfter - userCounterBefore).toBe(1);
    expect(responseAfter.body.pop().login).toBe(expextedLogin);
  });

  it('should add a user  /users route called with POST and valid userdata', async () => {
    const app = initApp();
    const User3 = {
      login: 'User-3',
      password: 'Password3',
      age: 44,
    };
    const responseBefore = await request(app).get('/users');
    const userCounterBefore = responseBefore.body.length;
    const response = await request(app).post(`/users`).send(User3);
    const responseAfter = await request(app).get('/users');
    const userCounterAfter = responseAfter.body.length;
    expect(userCounterAfter - userCounterBefore).toBe(1);
    expect(response.status).toBe(StatusCodes.OK);
  });

  it('should delete a user  /users route called with DELETE and valid id', async () => {
    const app = initApp();
    const User4 = {
      login: 'User-4',
      password: 'Password4',
      age: 44,
    };
    const fixtures = [
      {
        model: 'UserModel',
        data: User4,
      },
    ];
    await clearTable();
    await SequelizeFixtures.loadFixtures(fixtures, { UserModel } as any);
    const responseBefore = await request(app).get('/users');
    const newUserId = responseBefore.body[responseBefore.body.length - 1].id;
    const response = await request(app).delete(`/users/${newUserId}`);
    const responseAfter = await request(app).get('/users');
    expect(responseBefore.body.length - responseAfter.body.length).toBe(1);
    expect(response.status).toBe(StatusCodes.OK);
  });

  it('should modify a user  /users route called with PUT method and valid id', async () => {
    const app = initApp();
    const User4 = {
      login: 'User-4',
      password: 'Password4',
      age: 44,
    };
    const fixtures = [
      {
        model: 'UserModel',
        data: User4,
      },
    ];
    await clearTable();
    await SequelizeFixtures.loadFixtures(fixtures, { UserModel } as any);
    const responseBefore = await request(app).get('/users');
    const user = responseBefore.body[responseBefore.body.length - 1];
    const userId = user.id;
    const url = `/users/${userId}`;
    const response = await request(app).put(url).send({ login : 'NewUserLogin', age: user.age, password: user.password });
    const responseAfter = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(StatusCodes.OK);
    expect(responseAfter.status).toBe(StatusCodes.OK);
  });
});
