import database from '../../src/database';

export default function trucante() {
  return Promise.all(
    Object.keys(database.connection.models).map(key => {
      return database.connection.models[key].destroy({
        where: {},
        trucante: true,
        force: true,
      });
    })
  );
}
