import jwt from "jsonwebtoken"
import { config } from "dotenv"
import { sqlConnection } from "../dbConnection.js"
import { v2 as cloudinary } from "cloudinary"

config()

const postPicUpload = async (file) => {
    try {
        let imgLink
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
                uploadImage.end(file?.buffer)
            })
            return imgLink = result?.secure_url;
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
        const postsQuery = cat ? "SELECT * FROM blog_posts WHERE cat=?" : "SELECT * FROM blog_posts ORDER BY created_at DESC"

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
        const postQuery = "SELECT `name`, `title`, `description`, p.ID, p.img , u.img AS userImg, `uid`, created_at, `updated_at`, `cat` FROM blog_users u JOIN blog_posts p ON u.id=p.uid WHERE p.ID=?"
        sqlConnection.query(postQuery, [id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data[0])
        })
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}
//============ ADD NEW BLOG ============//
export const addPost = async (req, res) => {
    try {
        const { title, description, cat, formattedDate } = req.body;
        const token = req.cookies?.cookie_token;

        if (!token) return res.status(401).json({ message: 'Not authenticated!' });

        const image = await postPicUpload(req.file);

        jwt.verify(token, process.env.TOKEN_SECRET_KET, (err, userInfo) => {
            if (err) return res.status(401).json('Not authorized!');
            const addQuery = 'INSERT INTO blog_posts (title, description, cat, created_at, uid, updated_at, img) VALUES (?, ?, ?, ?, ?, ?, ?)';

            sqlConnection.query(addQuery, [title, description, cat, formattedDate, userInfo.id, formattedDate, image], (err, data) => {
                if (err) return res.status(500).json(err)
                res.status(201).json('Post created successfully');
            })
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

//============ DELETE BLOG ============//
export const deletePost = (req, res) => {
    const token = req.cookies?.cookie_token
    try {
        if (!token) return res.status(401).json("Not Authenticated!")
        jwt.verify(token, process.env.TOKEN_SECRET_KET, (err, userInfo) => {
            if (err) return res.status(401).json("Invalid Token!")

            const { id } = req.params
            const deleteQuery = "DELETE FROM blog_posts WHERE ID=? AND uid=?"
            sqlConnection.query(deleteQuery, [id, userInfo.id], (err, data) => {
                if (err) return res.status(401).json("You are not authorized!")
                return res.status(200).json("Post has deleted, successfully!")
            })
        })
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}
//============ UPDATE BLOG ============//
export const updatePost = async (req, res) => {
    const { id } = req.params
    try {
        const { title, description, cat, formattedDate } = req.body;

        const token = req.cookies?.cookie_token;

        if (!token) return res.status(401).json({ message: 'Not authenticated!' });

        const image = await postPicUpload(req.file);

        jwt.verify(token, process.env.TOKEN_SECRET_KET, (err, userInfo) => {

            if (err) return res.status(401).json('Not authorized!');

            const updateQuery = `UPDATE blog_posts 
            SET title=?, description=?, cat=?, updated_at=?, img=?
            WHERE ID=?`;

            sqlConnection.query(updateQuery, [title, description, cat, formattedDate, image, id], (err, data) => {
                if (err) return res.status(500).json(err)

                res.status(201).json('Post has updated successfully');
            })
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}