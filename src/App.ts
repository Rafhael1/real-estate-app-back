import express from "express"
const app = express()
const port = process.env.PORT || 8000
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
mongoose.connect( process.env.DB_CONNECT!, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

// Middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use("api/realestates/upload", express.static("upload"))



// Routes Imports

import authRoute from "./routes/auth"
import propertiesRoute from "./routes/properties"

// Routes
app.use("/api/user", authRoute)
app.use("/api/realestates", propertiesRoute)

app.listen(port,()=>{
	console.log("Server Started at Port, http://localhost:8000")
})
