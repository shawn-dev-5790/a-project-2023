import { createDatabaseEngine, Database } from './database'
import { UserTable } from './adaptor/database/tables/UserTable'
import { UserRepo } from './adaptor/database/repositories/UserRepo'
import { UserUseCase } from './application/usecases/UserUseCase'
import * as dotenv from 'dotenv'

dotenv.config()

console.log(process.env)
export class Container {
  // config
  config = {
    localDB: {
      name: process.env.LOCAL_DB_NAME,
      user: process.env.LOCAL_DB_USER,
      pwd: process.env.LOCAL_DB_PWD,
      host: process.env.LOCAL_DB_HOST,
    },
  }

  // database
  localDB = new Database(createDatabaseEngine(this.config.localDB), [UserTable])

  // repositories
  userRepo = new UserRepo(this.localDB.engine)
  // factory
  // domain factory
  // services
  // use cases
  userUC = new UserUseCase(this.userRepo)
}
