import { Exception } from '../exceptions'

export const userEntityFieldException = (field: string) => {
  return new Exception('UserEntity', 'VALIDATION_ERROR', { code: 400, field })
}
