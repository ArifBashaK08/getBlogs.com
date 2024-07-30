import jwt from "jsonwebtoken"
import { config } from "dotenv"
import { sqlConnection } from "../dbConnection.js"

config()

const profilePicUpload = async (file) => {
    let imgLink
    try {
        if (file) {
            // Upload to Cloudinary
            const result = await new Promise((resolve, reject) => {
                const uploadImage = cloudinary.uploader.upload_stream({ folder: "GetBlog_App_Posts" },
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
            return imgLink = "https://icrier.org/wp-content/uploads/2022/09/Event-Image-Not-Found.jpg";
        }
    } catch (error) {
        console.error("Image upload failed:", error); // Log the error for debugging
        throw new Error("Image upload failed");
    }
}
//============ GET ALL BLOGS ============//
export const getAllPosts = (req, res) => {
    const { cat } = req.query
    try {
        const postsQuery = cat ? "SELECT * FROM blog_posts WHERE cat=?" : "SELECT * FROM blog_posts"

        sqlConnection.query(postsQuery, [cat], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json(data)
        })
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}
//============ GET SINGLE BLOG ============//
export const getPost = (req, res) => {
    const { id } = req.params
    try {
        const postQuery = "SELECT `name`, `title`, `description`, p.img , u.img AS userImg, `uid`, `created_at`, `updated_at`, `cat` FROM blog_users u JOIN blog_posts p ON u.id=p.uid WHERE p.ID=?"
        sqlConnection.query(postQuery, [id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data[0])
        })
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}
//============ ADD NEW BLOG ============//
export const addPost = async(req, res) => {
    const {title, description, cat} = req.body
    try {
        const image = await profilePicUpload(req.file)
        res.status(200).json("This is Post router")
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}
//============ DELETE BLOG ============//
export const deletePost = (req, res) => {
    const token = req.cookies?.cookie_token
    try {
        if (!token) return res.status(401).json("Not Authenticated!")
        jwt.verify(token, process.env.TOKEN_SECRET_KET, (err, userInfo) => {
            if (err) {
                console.log("Verify error - ", err);
                return res.status(401).json("Invalid Token!")
            }

            const { id } = req.params
            const deleteQuery = "DELETE FROM blog_posts WHERE ID=? AND uid=?"
            console.log("id - ", id);
            console.log("UserId - ", userInfo);
            sqlConnection.query(deleteQuery, [id, userInfo.id], (err, data) => {
                if (err) return res.status(401).json("You are not authorized!")
                console.log("Post deleted!");
                res.status(200).json("Post has deleted, successfully!")
            })
        })
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}
//============ UPDATE BLOG ============//
export const updatePost = (req, res) => {
    try {
        res.status(200).json("This is Post router")
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}