import { UserRepo } from '../../adaptor/database/repositories'
import { UserEntity } from '../../domain/entities'

export interface IUserReadInDto {
  id: string
}
export interface IUserReadOutDto {
  user: UserEntity
}
export interface IUserCreateInDto {
  name: string
  email: string
  pwd: string
}
export interface IUserCreateOutDto {
  user: UserEntity
}
export interface IUserUpdateInDto {
  id: string
  name: string
}
export interface IUserUpdateOutDto {
  user: UserEntity
}
export interface IUserDeleteInDto {
  id: string
}
export interface IUserDeleteOutDto {
  user: UserEntity
}

export class UserUseCase {
  constructor(private _userRepo: UserRepo) {}

  async getUserById(dto: IUserReadInDto): Promise<IUserReadOutDto> {
    try {
      const user = await this._userRepo.findById(dto.id)
      return { user }
    } catch (error) {
      throw new Error('UserUseCase getUserById error')
    }
  }
  async createUser(dto: IUserCreateInDto): Promise<IUserCreateOutDto> {
    try {
      const userToCreate: UserEntity = new UserEntity({
        name: dto.name,
        email: dto.email,
        pwd: dto.pwd,
      })
      if (!userToCreate.canCreate()) throw new Error('can not create user')
      userToCreate.create()
      const user = await this._userRepo.create(userToCreate)
      return { user }
    } catch (error) {
      throw new Error('UserUseCase createUser error')
    }
  }
  async updateUser(dto: IUserUpdateInDto): Promise<IUserUpdateOutDto> {
    try {
      const userToUpdate: UserEntity = await this._userRepo.findById(dto.id)
      if (!userToUpdate.canUpdate()) throw new Error('can not update user')
      userToUpdate.updateName(dto.name)
      userToUpdate.update()
      const user = await this._userRepo.update(userToUpdate)
      return { user }
    } catch (error) {
      throw new Error('UserUseCase updateUser error')
    }
  }
  async deleteUser(dto: IUserDeleteInDto): Promise<IUserDeleteOutDto> {
    try {
      const userToDelete: UserEntity = await this._userRepo.findById(dto.id)
      if (!userToDelete.canDelete()) throw new Error('can not delete user')
      userToDelete.delete()
      const user = await this._userRepo.delete(userToDelete)
      return { user }
    } catch (error) {
      throw new Error('UserUseCase deleteUser error')
    }
  }
}
