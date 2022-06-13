import { errorHandler } from './middlewares/error-handler'
import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { routesInit } from './routes'
const app = express()

app.set('trust proxy', true)
app.use(json())

routesInit(app)

app.use(errorHandler)

export { app }
