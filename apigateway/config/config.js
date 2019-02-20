module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'principles_dev_database',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'principles_test_database',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: 'postgres',
    database: 'principles_prod_database',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
