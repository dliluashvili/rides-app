import { createRideTableSchema } from './schemas'
import connection from './connection'
import logger from '../src/logger'

const db = connection('./database/sqlite.db')

db.run(createRideTableSchema)

export { db }
