import Sequelize from 'sequelize';
import models from '../app/models';
import databaseConfig from '../config/database';

const modelsArray = Object.values(models);

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    modelsArray.map(model => model.init(this.connection));
    modelsArray.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
