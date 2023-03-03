import { Sequelize, DataTypes, Model } from 'sequelize'

export interface IUserTable {
  id: string
  status: string
  name: string
  email: string
  pwd: string
  createdAt: number
  updatedAt: number
  deletedAt: number
}

export class UserTable extends Model<IUserTable, IUserTable> implements IUserTable {
  id: string
  status: string
  name: string
  email: string
  pwd: string
  createdAt: number
  updatedAt: number
  deletedAt: number

  static initModel(sequelize: Sequelize) {
    UserTable.init(
      {
        id: { type: DataTypes.STRING, primaryKey: true },
        status: { type: DataTypes.STRING },
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        pwd: { type: DataTypes.STRING },
        createdAt: { type: DataTypes.INTEGER },
        updatedAt: { type: DataTypes.INTEGER },
        deletedAt: { type: DataTypes.INTEGER },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: false,
      }
    )
  }
}
