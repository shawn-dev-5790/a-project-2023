import { Sequelize } from 'sequelize'

export const createDatabaseEngine = (config: { name: string; user: string; pwd: string; host: string }): Sequelize => {
  return new Sequelize(config.name, config.user, config.pwd, { host: config.host, dialect: 'mysql' })
}

export class Database {
  constructor(public engine: Sequelize, models = []) {
    models.map((m) => m.initModel(engine))
  }

  connect() {
    return this.engine
      .authenticate()
      .then(() => console.log('success to connect'))
      .catch((err) => console.log('reject to connect', err))
  }
}
