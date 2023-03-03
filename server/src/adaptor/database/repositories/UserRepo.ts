import { Model, Sequelize } from 'sequelize'
import { UserEntity } from '../../../domain/entities'
import { UserAbsRepo } from '../../../domain/repositories'
import { IUserTable, UserTable } from '../tables'

const entityToTable = (entity: UserEntity): Model<IUserTable, IUserTable> => new UserTable(entity.toJSON())
const tableToEntity = (table: Model<IUserTable, IUserTable>): UserEntity => new UserEntity(table.dataValues)

export class UserRepo implements UserAbsRepo {
  constructor(private _database: Sequelize) {}
  async create(user: UserEntity) {
    const Users = this._database.models.UserTable
    const record = entityToTable(user)
    const res = await Users.create({ ...record.dataValues })
    await res.save()
    return tableToEntity(res)
  }
  async update(user: UserEntity) {
    const Users = this._database.models.UserTable
    const target = await Users.findOne({ where: { id: user.id.value } })
    const record = entityToTable(user)
    const res = await target.update({ ...record.dataValues })
    await res.save()
    return tableToEntity(res)
  }
  async delete(user: UserEntity) {
    const Users = this._database.models.UserTable
    const target = await Users.findOne({ where: { id: user.id.value } })
    const record = entityToTable(user)
    const res = await target.update({ ...record.dataValues })
    await res.save()
    return tableToEntity(res)
  }
  async findById(id: string) {
    const Users = this._database.models.UserTable
    const res = await Users.findOne({ where: { id } })
    return tableToEntity(res)
  }
}
