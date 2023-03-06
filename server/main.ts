import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import * as endpoints from './src/adaptor/web/endpoints'
import { Container } from './src/container'
import { SkipList } from './src/utils/SkipList'

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

// const list = new SkipList();

// list.insert(3);
// list.insert(1);
// list.insert(4);
// list.insert(1);
// list.insert(5);
// list.insert(9);

// console.log("Skip List after insertions:");
// list.print();

// console.log(`Searching for 5: ${list.search(5)}`);
// console.log(`Searching for 7: ${list.search(7)}`);

// console.log(`Deleting 1: ${list.delete(1)}`);
// console.log(`Deleting 7: ${list.delete(7)}`);

// console.log("Skip List after deletions:");
// list.print();
