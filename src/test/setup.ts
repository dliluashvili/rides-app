import connection from '../../database/connection'
import { createRideTableSchema } from '../../database/schemas'

let db: any
beforeAll(async () => {
    db = connection('./database/sqlite_test.db')
    db.run(createRideTableSchema)
})

beforeEach(async () => {
    db.run('DELETE from Rides where rideID > 0')
})

afterAll(async () => {
    db.close()
})
