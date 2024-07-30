import { Router } from "express"
import { signin, signout } from "../controllers/authControllers.js"
import multer from "multer"

const upload = multer()
const authRouter = Router()

authRouter.post("/signin", upload.none(), signin)
authRouter.post("/signout", signout)

export default authRouter