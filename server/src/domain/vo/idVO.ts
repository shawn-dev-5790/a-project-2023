import { v4 as uuidv4, validate as uuidValidate, version as uuidVersion, NIL } from 'uuid'

class IdVO {
  constructor(public value: string) {
    this.value = value
    this.validate()
  }
  static uuid(): string {
    return uuidv4()
  }
  validate(): boolean {
    try {
      if (!uuidValidate(this.value)) throw new Error('uuid validate error')
      if (uuidVersion(this.value) !== 4) throw new Error('uuid version err')
      return true
    } catch (error) {
      this.value = NIL
      return false
    }
  }
}

export class UserIdVO extends IdVO {}
