export class DateVO {
  constructor(public value: number) {
    this.value = value
    this.validate()
  }
  static now(): number {
    return Date.now()
  }
  verifyValueIsTimestamp(): boolean {
    return !!Date.parse(new Date(this.value).toString())
  }
  validate() {
    try {
      if (!this.verifyValueIsTimestamp()) throw new Error('date validation error')
      return true
    } catch (error) {
      this.value = 0
      return false
    }
  }
}
