const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")
const User = require("../modals/User")



exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please Provide Valid Email" })
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Please Provide Valid Password" })
    }

    if (!name) {
        return res.status(400).json({ message: "Please Provide Name" })
    }

    const result = await User.findOne({ email })

    if (result) {
        return res.status(400).json({ message: "Email Is Already In Use" })
    }

    const hashPass = await bcrypt.hash(password, 10)

    await User.create({ ...req.body, password: hashPass })

    res.status(201).json({ message: "User Register Success" })
})



exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Email And Password Required" })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Please Provide Valid Email" })
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Please Provide Valid Password" })
    }

    const result = await User.findOne({ email })

    if (!result) {
        return res.status(400).json({ message: "Email Is Not Register With Us" })
    }

    if (!result.active) {
        return res.status(400).json({ message: "User Is Block By Admin" })
    }

    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        return res.status(400).json({ message: "Password Do Not Match" })
    }


    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "2d" })

    res.cookie("shortly", token, { maxAge: 360000 * 4 })

    res.status(200).json({
        message: "User Login Success",
        result: {
            name: result.name,
            email: result.email,
            role: result.role
        }
    })

})



exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie("shortly")

    res.status(200).json({ message: "User Logout Success" })
})