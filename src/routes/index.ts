import { Express } from 'express'
import { allRidesRouter } from './rides/all-rides'
import { createRideRouter } from './rides/create-ride'
import { showRidesRouter } from './rides/show-ride'

const init = (app: Express) => {
    app.use(allRidesRouter)
    app.use(createRideRouter)
    app.use(showRidesRouter)
}

export { init as routesInit }
