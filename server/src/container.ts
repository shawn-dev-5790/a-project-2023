import { createDatabaseEngine, Database } from './database'
import { UserTable } from './adaptor/database/tables/UserTable'
import { UserRepo } from './adaptor/database/repositories/UserRepo'
import { UserUseCase } from './application/usecases/UserUseCase'

export class Container {
  // config
  config = { localDB: { name: 'gg', user: 'root', pwd: '', host: '127.0.0.1' } }

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
