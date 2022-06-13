import express, { Request, Response } from 'express'
import logger from '../../logger'
import { RideService } from '../../services/rides'
const router = express.Router()

router.get('/rides', async (req: Request, res: Response) => {
    try {
        const rideService = new RideService()
        const rides = await rideService.getAll()

        res.status(200).send(rides)
        logger.info('Successfuly got list of rides', { rides })
    } catch (e) {
        console.log('error', e)
    }
})

export { router as allRidesRouter }
