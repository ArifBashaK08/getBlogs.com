import express from "express"
import "./dbConnection.js"
import cors from "cors"
import { config } from "dotenv"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { signup } from "./controllers/authControllers.js"
import { authRouter, postRouter, userRouter } from "./routes/index.js"
import cookieParser from "cookie-parser"
import { addPost, updatePost } from "./controllers/postControllers.js"

const app = express()
const PORT = process.env.PORT || 2357

config()

//Middleware
app.use(cors())
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

//============ CLOUD STORAGE ============//
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETKEY,
})

const storage = multer.memoryStorage();

const uploadImage = multer({ storage });
//================== X ==================//

//Routes

//Signup route
app.post("/api/auth/signup", uploadImage.single("image"), signup)
//Add Post Route
app.post("/api/posts/add", uploadImage.single("image"), addPost)
app.put("/api/posts/:id", uploadImage.single("image"), updatePost)

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.listen(PORT, () => console.log(`Server is connecting on Port : ${PORT}`))

