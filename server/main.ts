import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import * as endpoints from './src/adaptor/web/endpoints'
import { Container } from './src/container'

const server = express()

server.set('port', 4000)
server.set('container', new Container())

server.use((req: any, res, next) => {
  req._container = server.get('container')
  next()
})
server.use(morgan('dev'))
server.use(cors())

server.use('/users', endpoints.users)

server.listen(server.get('port'), () => console.log(`server is listening on port ${server.get('port')}`))
