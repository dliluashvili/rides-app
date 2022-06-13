import * as sqlite from 'sqlite3'
const sqlite3 = sqlite.verbose()

export default (databaseName: string) => {
    return new sqlite3.Database(databaseName)
}
