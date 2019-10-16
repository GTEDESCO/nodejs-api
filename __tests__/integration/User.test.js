import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';
import authConfig from '../../src/config/auth';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('deve ser possivel listar os usuários', async () => {
    const user = await factory.create('User');

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('docs');
  });

  it('deve ser possivel listar os usuários pesquisando pelo email', async () => {
    const user = await factory.create('User');

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .get(`/users?email=${user.email}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.docs.length).toBe(1);
  });

  it('deve ser possivel listar os usuários paginando', async () => {
    const user = await factory.create('User');

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('docs');
  });

  it('deve ser possivel listar um usuário pelo id', async () => {
    const user = await factory.create('User');

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .get(`/users/show/${user.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
  });

  it('deve ser possivel se cadastrar', async () => {
    const user = await factory.create('User');

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'teste',
        email: 'teste@teste.com',
        password: '123456',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
  });

  it('não deve ser possivel se cadastrar com email idênticos', async () => {
    const user = await factory.create('User');

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const userTwo = await factory.create('User', {
      email: 'testeCreate@teste.com.br',
    });

    const response = await request(app)
      .post('/users')
      .send({
        name: user.name,
        email: userTwo.email,
        password: user.password,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('deve validar os campos do create', async () => {
    const user = await factory.create('User');

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('deve ser possivel se atualizar', async () => {
    const user = await factory.create('User');

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .put(`/users/${user.id}`)
      .send({
        name: 'teste2',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('não deve ser possivel se atualizar com email idênticos', async () => {
    const user = await factory.create('User');

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const userTwo = await factory.create('User', {
      email: 'teste@teste.com.br',
    });

    const response = await request(app)
      .put(`/users/${user.id}`)
      .send({
        email: userTwo.email,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('deve validar os campos do update', async () => {
    const user = await factory.create('User');

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .put('/users/teste')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('deve ser possivel se deletar', async () => {
    const user = await factory.create('User', {
      id: 5000,
    });

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
