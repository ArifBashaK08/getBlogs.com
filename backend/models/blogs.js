import { connectToDatabase } from "../sqlConnection";

const blogUsers = "Blog_Users"

export const createUserTable = `
CREATE TABLE IF NOT EXISTS ${blogUsers}(
ID INT NOT NULL PRIMARY KEY AUTO INCREMENT,
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
img VARCHAR(255)
)`

const db = connectToDatabase()

db.query(createUserTable, (err, result) => {
    if(err) throw err
    console.log(`Table ${tableName} created successfully!`);
})