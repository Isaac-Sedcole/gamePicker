const path = require('path')
// const path = 'postgres://USER:PASSWORD@INTERNAL_HOST:PORT/DATABASE'

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'dev.sqlite3')
    },
    useNullAsDefault: true
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true,
    seeds: {
      directory: path.join(__dirname, 'seeds')
    },
    migrations: {
      directory: path.join(__dirname, 'migrations')
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}

//to install SQLITE do: sudo apt install python-is-python3 for linux (on campus)
//npm i --save sqlite3@4
//check for make and python-is-python3 - make is something like sudo apt install build-essentials