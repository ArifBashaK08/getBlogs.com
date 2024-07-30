import mysql from "mysql2"
import { config } from "dotenv"

config()

const user = process.env.DB_USER || "root"
const host = process.env.DB_HOST || "localhost"
const password = process.env.DB_PASSWORD
const database = process.env.DATABASE

export const sqlConnection = mysql.createConnection({
    user,
    host,
    password,
    database
})

sqlConnection.connect(err => {
    if (err) throw err;
    console.log("Server connected to SQL DB");
})

