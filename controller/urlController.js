const asyncHandler = require("express-async-handler")
const Url = require("../modals/Url")


exports.getLongUrl = asyncHandler(async (req, res) => {
    const { shortUrl } = req.params
    const result = await Url.findOne({ shortUrl })
    if (!result) {
        return res.status(400).json({ message: "Invalid Code" })
    }

    await Url.findByIdAndUpdate(result._id, { count: result.count + 1 })

    res.status(200).json({ message: "url fetch succcess", result: result.longUrl })
})