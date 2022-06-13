import { createLogger, transports, format } from 'winston'

var today = new Date()

var datestring =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()

export default createLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(({ timestamp, level, message, metadata }) => {
                    return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(
                        metadata,
                    )}`
                }),
            ),
        }),
        new transports.File({
            dirname: 'logs',
            filename: `${datestring}.log`,
            format: format.combine(format.json()),
        }),
    ],
    format: format.combine(format.metadata(), format.timestamp()),
})
