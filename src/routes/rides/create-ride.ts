import { BadRequestError } from './../../errors/bad-request-error'
import { body } from 'express-validator'
import express, { Request, Response } from 'express'
import { validateRequest } from '../../middlewares/validate-request'
import { RideService } from '../../services/rides'
import { InsertValues } from '../../types'
import logger from '../../logger'

const router = express.Router()

router.post(
    '/rides',
    [
        body('start_lat')
            .isFloat({ min: -90, max: 90 })
            .toFloat()
            .withMessage('Start latitude must be between [-90, 90] degrees'),
        body('start_long')
            .isFloat({ min: -180, max: 180 })
            .toFloat()
            .withMessage('Start longitude must be between [-180, 180] degrees'),
        body('end_lat')
            .isFloat({ min: -90, max: 90 })
            .toFloat()
            .withMessage('End latitude must be between [-90, 90]'),
        body('end_long')
            .isFloat({ min: -180, max: 180 })
            .toFloat()
            .withMessage('End longitude must be between [-180, 180] degrees'),
        body('rider_name')
            .isString()
            .isLength({ min: 1 })
            .withMessage('Rider name must be a non empty string'),
        body('driver_name')
            .isString()
            .isLength({ min: 1 })
            .withMessage('Driver name must be a non empty string'),
        body('driver_vehicle')
            .isString()
            .isLength({ min: 1 })
            .withMessage('Driver vehicle must be a non empty string'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const {
            start_lat: startLatitude,
            start_long: startLongitude,
            end_lat: endLatitude,
            end_long: endLongitude,
            rider_name: riderName,
            driver_name: driverName,
            driver_vehicle: driverVehicle,
        } = req.body

        const values: InsertValues = [
            startLatitude,
            startLongitude,
            endLatitude,
            endLongitude,
            riderName,
            driverName,
            driverVehicle,
        ]

        try {
            const rideService = new RideService()
            const rideId = await rideService.create(values)
            const ride = await rideService.getOne(Number(rideId))

            res.status(201).send(ride)
            logger.info('Successfuly created the ride', { ride })
        } catch (e) {
            logger.error('An error occured', { error: e })
            throw new BadRequestError('An error occured, try again')
        }
    },
)

export { router as createRideRouter }
