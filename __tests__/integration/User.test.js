import request from 'supertest';

import app from '../../src/app';

describe('User', () => {
  it('deve ser possivel se cadastrar', async () => {
    const response = request(app)
      .post('/users')
      .send({
        name: 'teste',
        email: 'teste@teste.com',
        password: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });
});
