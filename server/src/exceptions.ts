export class Exception implements Error {
  constructor(public name: string, public message: string, public cause?: any) {
    console.log('\x1b[35m', `${this.cause?.code} | ${this.message} : ${this.name}.${this.cause?.field}`, '\x1b[0m')
  }
}
