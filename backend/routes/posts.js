import { Router } from "express"
import { getAllPosts, getPost, deletePost } from "../controllers/postControllers.js"

const postRouter = Router()

postRouter.get("/", getAllPosts)
postRouter.get("/:id", getPost)
postRouter.delete("/:id", deletePost)

export default postRouter