import request from 'supertest';

import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('deve ser possivel se cadastrar', async () => {
    const user = await factory.attrs('User');

    const response = request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });
});
