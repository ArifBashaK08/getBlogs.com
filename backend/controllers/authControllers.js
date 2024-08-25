import { UserModel } from "../models/users.js"
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
        const findUser = await UserModel.findOne({
            $or: [{ email }, { username }]
        })

        if (findUser) return res.status(409).json("User already exists!")

        //ENCRIPTING PASSWORD
        const saltRounds = 10
        const encryptedPassword = bcrypt.hashSync(password, saltRounds)

        const newUser = new UserModel({
            email, username, name, img,
            password: encryptedPassword,
        })

        await newUser.save()

        return res.status(200).json("User has been created")

    } catch (error) {
        console.error(error);
        return res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}

//SIGNIN ROUTER

export const signin = async (req, res) => {
    const { email } = req.body
    try {
        //Finding User
        const findUser = await UserModel.findOne({ email })

        if (!findUser) return res.status(404).json("User not found! Please, Signup")

        //ENCRIPTING INPUT-PASSWORD
        const isPasswordMatched = bcrypt.compareSync(req.body.password, findUser.password)

        if (!isPasswordMatched) return res.status(400).json({ message: "Invalid Credentials!" })

        const token = jwt.sign({ id: findUser._id }, process.env.TOKEN_SECRET_KEY);

        //Passing details otherthan password to cookieToken
        const { password, ...otherDetails } = findUser.toObject()

        return res.cookie("cookie_token", token, {
            httpOnly: true,
            secure: process.env.ENVIRONMENT === 'production',
            maxAge: 3600000 * 24 * 15
        }).status(200).json(otherDetails)

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