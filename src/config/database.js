require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || '',
  host: process.env.DB_HOST || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
  migrationStorageTableName: 'sequelize_meta',
  storage: './__tests__/database.sqlite',
  logging: process.env.NODE_ENV === 'development',
  retry: {
    match: [/SQLITE_BUSY/],
    name: 'query',
    max: 5,
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    freezeTableName: true,
  },
};
