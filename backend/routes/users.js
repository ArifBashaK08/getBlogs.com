import {Router} from "express"
import { getUserData } from "../controllers/userControllers.js"

const userRouter = Router()

userRouter.get("/", getUserData)

export default userRouter