const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config({ path: "./.env" })
const path = require("path")
const cookieParser = require("cookie-parser")
const { userProtected, adminProtected } = require("./middleware/protected")


mongoose.connect(process.env.MONGO_URL)
const app = express()

app.use(express.static(path.join(__dirname, "dist")))

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



app.use("/api/v1/auth", require("./routes/authRoute"))
app.use("/api/v1/user", userProtected, require("./routes/userRoute"))
app.use("/api/v1/url", require("./routes/urlRoute"))
app.use("/api/v1/admin", adminProtected, require("./routes/adminRoute"))


app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    // res.status(404).json({ message: "Resource Not Found" })
})


app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: err.message || "something went wrong" })
})


mongoose.connection.once("open", () => {
    console.log("Mongo Connected")
    app.listen(process.env.PORT), console.log(`Server Running: http://localhost/${process.env.PORT}`)
})