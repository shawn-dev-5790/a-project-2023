import { userEntityFieldException } from '../exceptions'
import { UserIdVO, UserStatusEnumVO, DateVO } from '../vo'

export class UserEntity {
  id: UserIdVO
  status: UserStatusEnumVO
  name: string
  email: string
  pwd: string
  createdAt: DateVO
  updatedAt: DateVO
  deletedAt: DateVO

  constructor(user: {
    id?: string
    status?: string
    name: string
    email: string
    pwd: string
    createdAt?: number
    updatedAt?: number
    deletedAt?: number
  }) {
    this.id = new UserIdVO(user.id || UserIdVO.uuid())
    this.status = new UserStatusEnumVO(user.status || UserStatusEnumVO.created)
    this.name = user.name
    this.email = user.email
    this.pwd = user.pwd
    this.createdAt = new DateVO(user.createdAt || DateVO.now())
    this.updatedAt = new DateVO(user.updatedAt)
    this.deletedAt = new DateVO(user.deletedAt)
    this.validate()
  }

  verifyName(): boolean {
    return !!this.name
  }
  verifyEmail(): boolean {
    return !!this.email
  }
  verifyPwd(): boolean {
    return !!this.pwd
  }
  validate(): boolean {
    try {
      if (!this.verifyName()) throw userEntityFieldException('name')
      if (!this.verifyEmail()) throw userEntityFieldException('email')
      if (!this.verifyPwd()) throw userEntityFieldException('pwd')
      return true
    } catch (error) {
      return false
    }
  }

  create() {
    this.status = new UserStatusEnumVO(UserStatusEnumVO.created)
    this.createdAt = new DateVO(DateVO.now())
  }
  updateName(name: string) {
    this.name = name
  }
  update() {
    this.status = new UserStatusEnumVO(UserStatusEnumVO.updated)
    this.updatedAt = new DateVO(DateVO.now())
  }
  delete() {
    this.status = new UserStatusEnumVO(UserStatusEnumVO.deleted)
    this.updatedAt = new DateVO(DateVO.now())
    this.deletedAt = new DateVO(DateVO.now())
  }

  canCreate() {
    return true
  }
  canUpdate() {
    return true
  }
  canDelete() {
    return true
  }

  toJSON() {
    return {
      ...this,
      id: this.id.value,
      status: this.status.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      deletedAt: this.deletedAt.value,
    }
  }
}
