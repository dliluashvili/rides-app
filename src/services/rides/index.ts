import { InsertValues } from './../../types/index'
import { db } from '../../../database'
import { RideInterface } from '../../interfaces/ride-interface'

export class RideService {
    constructor() {}

    getAll(): Promise<RideInterface[]> {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const query = db.prepare('SELECT * FROM Rides')
                query.all((err, rows) => {
                    if (err) {
                        reject(err)
                    }

                    resolve(rows)
                })
            })
        })
    }

    getOne(rideId: number): Promise<RideInterface | null> {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const query = db.prepare('SELECT * FROM Rides WHERE rideID = ?')
                query.get(rideId, (err, row) => {
                    if (err) {
                        reject(err)
                    }

                    resolve(row ? row : null)
                })
            })
        })
    }

    create(values: InsertValues): Promise<number> {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const query = db.prepare(
                    'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES(?, ?, ?, ?, ?, ?, ?)',
                    values,
                )

                query.run(values, function (err) {
                    if (err) {
                        reject(err)
                    }

                    resolve(this.lastID)
                })
            })
        })
    }
}
