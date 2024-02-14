const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../modals/User")



exports.userProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.shortly
    if (!token) {
        return res.status(401).json({ message: "No Cookie Found" })
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "JWT error p" })
        }

        req.body.userId = decode.userId
        next()
    })
})




exports.adminProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.shortly
    if (!token) {
        return res.status(401).json({ message: "No Cookie Found" })
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
        if (err) {
            return res.status(401).json({ message: err.message || "JWT error ap" })
        }


        const result = await User.findById(decode.userId)

        if (!result || result.role !== "admin") {
            return res.status(401).json({ message: err.message || "Only Admin Access" })
        }


        req.body.userId = decode.userId
        next()
    })
})