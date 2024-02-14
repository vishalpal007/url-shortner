const asyncHandler = require("express-async-handler")
const User = require("../modals/User")
const Url = require("../modals/Url")


exports.adminGetAllUsers = asyncHandler(async (req, res) => {
    const result = await User.find({ role: "user" })


    res.status(200).json({ message: "All User Fetch Success", result })
})



exports.adminUpdateUser = asyncHandler(async (req, res) => {
    const { userId } = req.params
    await User.findByIdAndUpdate(
        userId,
        { ...req.body, role: "user" },
        { runValidators: true }
    )

    res.status(200).json({ message: "User Update Success" })
})



exports.adminGetUrl = asyncHandler(async (req, res) => {
    const { userId } = req.params

    const result = await Url.find({ userId })

    res.status(200).json({ message: "User Update Success", result })
})