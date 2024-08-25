import jwt from "jsonwebtoken"
import { config } from "dotenv"
import { BlogModel } from "../models/blogs.js"
import { v2 as cloudinary } from "cloudinary"
import { UserModel } from "../models/users.js"

config()

const postPicUpload = async (file) => {
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
export const getAllPosts = async (req, res) => {
    const { cat } = req.query
    try {
        const allPosts = cat ? await BlogModel.find({ cat }) : await BlogModel.find()

        if (allPosts.length === 0) return res.status(404).json({ message: 'Not Found!' })

        return res.status(200).json(allPosts)
    } catch (error) {
        res.status(500).send(`<h1>Something went wrong</h1>`)
    }
}
//============ GET SINGLE BLOG ============//
export const getPost = async (req, res) => {
    const { id } = req.params
    try {

        const findPost = await BlogModel.findById(id)

        if (!findPost) return res.status(404).json({ message: 'Blog not found!' })

        const { uId, ...postDetails } = findPost.toObject()

        let user = {};
        if (uId) {
            user = await UserModel.findById(uId);
            if (!user) return res.status(404).json({ message: 'User not found!' });
        }
        const response = {
            uId,
            name: user.name || null,
            userImg: user.img || null,
            ID: postDetails._id,
            title: postDetails.title,
            description: postDetails.description,
            img: postDetails.img,
            created_at: postDetails.created_at,
            updated_at: postDetails.updated_at,
            cat: postDetails.cat
        }
        return res.status(200).json(response)
    } catch (error) {
        console.error("Error fetching post:", error);
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

        jwt.verify(token, process.env.TOKEN_SECRET_KET, async (err, userInfo) => {
            if (err) return res.status(401).json('Not authorized!');

            const newPost = new BlogModel({
                title,
                description,
                cat,
                formattedDate,
                formattedDate,
                uId: userInfo.id,
                img: image
            })

            await newPost.save()

            res.status(201).json('Post created successfully');
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

//============ DELETE BLOG ============//
export const deletePost = async (req, res) => {
    const token = req.cookies?.cookie_token
    try {
        if (!token) return res.status(401).json("Not Authenticated!")

        const userInfo = jwt.verify(token, process.env.TOKEN_SECRET_KET)

        if (!userInfo) return res.status(401).json("Invalid Token!")

        const { id } = req.params

        const deletePost = await BlogModel.findById(id)

        if (deletePost.uId.toString() !== userInfo.id) return res.status(403).json('You are not authorized to delete this post!');

        await BlogModel.findByIdAndDelete(id);

        return res.status(200).json("Post has deleted, successfully!")
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

        const userInfo = jwt.verify(token, process.env.TOKEN_SECRET_KET)

        const post = await BlogModel.findById(id);

        if (!post) return res.status(404).json({ message: 'Post not found!' });

        if (post.uId.toString() !== userInfo.id) return res.status(401).json('You are not authorized!');

        const image = req.file ? await postPicUpload(req.file) : null;

        const updatePost = await BlogModel.findByIdAndUpdate(id, {
            $set: {
                title, description, cat, formattedDate,
                img: image || post.img
            }
        }, { new: true })

        res.status(201).json('Post has updated successfully');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}