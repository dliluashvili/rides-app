import dotenv from 'dotenv'
dotenv.config()
import { app } from './app'
import '../database'

const start = () => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}!`)
    })
}

start()
