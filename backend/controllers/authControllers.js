import { sqlConnection } from "../dbConnection.js"
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"
import jwt from "jsonwebtoken"
import { config } from "dotenv"

config()

const profilePicUpload = async (file) => {
    let imgLink
    try {
        if (file) {
            // Upload to Cloudinary
            const result = await new Promise((resolve, reject) => {
                const uploadImage = cloudinary.uploader.upload_stream({ folder: "GetBlog_App_Users" },
                    (error, result) => {
                        if (result) {
                            resolve(result)
                        } else {
                            reject(error)
                        }
                    }
                )
                uploadImage.end(file.buffer)
            })
            return imgLink = result.secure_url;
        } else {
            // Use default image if no file uploaded
            return imgLink = "https://res-console.cloudinary.com/duk9i4dpt/media_explorer_thumbnails/ca24e81fae664d5d98ad238f68c94293/detailed";
        }
    } catch (error) {
        console.error("Image upload failed:", error); // Log the error for debugging
        throw new Error("Image upload failed");
    }
}

export const signup = async (req, res) => {
    const { email, username, name, password } = req.body
    try {
        const img = await profilePicUpload(req.file)

        //CHECKING FOR EXISTING USER AND ADD USER
        const findUser = "SELECT * FROM blog_users WHERE email = ? OR username = ?;";
        sqlConnection.query(findUser, [email, username], (err, data) => {
            if (err) return res.status(500).json(err)
            if (data.length) return res.status(409).json("User already exists!")

            //ENCRIPTING PASSWORD
            const saltRounds = 10
            const encryptedPassword = bcrypt.hashSync(password, saltRounds)

            //ADDING USER TO SQL
            const addUserQuery = `INSERT INTO blog_users(email, username, name, password, img) VALUES (?,?,?,?,?);`
            const userDetails = [email, username, name, encryptedPassword, img]

            sqlConnection.query(addUserQuery, userDetails, (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json(err)
                }
                res.status(200).json("User has been created")
            })
        })
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}

//SIGNIN ROUTER

export const signin = (req, res) => {
    try {
        //Finding User
        const findUser = "SELECT * FROM blog_users WHERE email=?;"
        sqlConnection.query(findUser, [req.body.email], (err, data) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (data.length === 0) {
                return res.status(404).json("User not found! Please, Signup")
            }
            console.log("Found Data", data[0])
            //ENCRIPTING INPUT-PASSWORD
            const isPasswordMatched = bcrypt.compareSync(req.body.password, data[0].password)
            if (!isPasswordMatched) {
                return res.status(400).json({ message: "Invalid Credentials!" })
            }
console.log(data[0].ID);
            const token = jwt.sign({ id: data[0].ID }, process.env.TOKEN_SECRET_KET);

            //Passing details otherthan password to cookieToken
            const { password, ...other } = data[0]
            res.cookie("cookie_token", token, {
                httpOnly: true,
            }).status(200).json(other)
        })
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}

// SIGNOUT ROUTER

export const signout = (req, res) => {
    try {
        res.clearCookie("cookie_token", {
            sameSite: "none",
            secure: true
        })
        res.status(200).json("User has been logged out!")
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}