import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';
import factory from '../factories';
import authConfig from '../../src/config/auth';

describe('Autenticação', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('deve validar os campos do login', async () => {
    const response = await request(app).post('/sessions');

    expect(response.status).toBe(400);
  });

  it('deve poder se autenticar com credenciais válidas', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.status).toBe(200);
  });

  it('não deve ser capaz de autenticar com senha inválida', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '12345678',
      });

    expect(response.status).toBe(401);
  });

  it('não deve ser capaz de autenticar com email inválido', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'invalid@teste.com',
        password: '12345678',
      });

    expect(response.status).toBe(401);
  });

  it('deve retornar o token jwt quando autenticado', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.body).toHaveProperty('token');
  });

  it('deve poder acessar rotas privadas quando autenticado', async () => {
    const user = await factory.create('User');

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('não deve poder acessar rotas privadas quando não estiver autenticado', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(401);
  });

  it('não deve poder acessar rotas privadas com token inválido', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer 123123`);

    expect(response.status).toBe(401);
  });
});
