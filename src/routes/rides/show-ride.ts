import { BadRequestError } from '../../errors/bad-request-error'
import express, { Request, Response } from 'express'
import { NotFoundError } from '../../errors/not-found-error'
import { RideService } from '../../services/rides'
import logger from '../../logger'
const router = express.Router()

router.get('/rides/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const rideService = new RideService()
    const ride = await rideService.getOne(id)

    logger.error('The Ride not found ', { rideId: id })

    if (!ride) {
        throw new NotFoundError('The Ride not found')
    }

    res.status(200).send(ride)

    logger.info('Successfuly got the ride', { ride })
})

export { router as showRidesRouter }
