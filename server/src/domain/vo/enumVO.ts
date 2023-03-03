class EnumVO {
  constructor(public value: string, public values: string[]) {
    this.value = value
    this.values = values
  }

  is(value: string): boolean {
    return this.value === value
  }
  validate(): boolean {
    try {
      if (!this.values.includes(this.value)) throw new Error('enums error')
      return true
    } catch (error) {
      this.value = 'not allowed enum'
      return false
    }
  }
}

export class UserStatusEnumVO extends EnumVO {
  static created = 'created'
  static updated = 'updated'
  static deleted = 'deleted'

  constructor(value: string) {
    super(value, Object.values(UserStatusEnumVO))
    super.validate()
  }
}
