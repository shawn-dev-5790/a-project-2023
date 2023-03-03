import { UserEntity } from '../entities'

export abstract class UserAbsRepo {
  abstract create(user: UserEntity)
  abstract update(user: UserEntity)
  abstract delete(user: UserEntity)
  abstract findById(id: string)
}
