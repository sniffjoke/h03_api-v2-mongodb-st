import express from "express";
import cors from "cors";
import {SETTINGS} from "./settings";
import {connectToDB} from "./db/mongo-db";
import blogsRoutes from "./routes/blogsRoutes";
import postsRoutes from "./routes/postsRoutes";
import testingRoutes from "./routes/testingRoutes";
// import blogsRoutes from "./routers/blogsRoutes";
// import postsRoutes from "./routers/postsRoutes";
// import testingRoutes from "./routers/testingRoutes";

connectToDB()

export const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {

    res.status(200).json({version: '1.0'})

})

// app.use(express.urlencoded({extended: false}))
app.use(SETTINGS.PATH.BLOGS, blogsRoutes)
app.use(SETTINGS.PATH.POSTS, postsRoutes)
app.use(SETTINGS.PATH.TESTING, testingRoutes)
