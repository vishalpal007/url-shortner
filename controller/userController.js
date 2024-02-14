const asyncHandler = require("express-async-handler")
const Url = require("../modals/Url")
const { nanoid } = require("nanoid")


exports.addUrl = asyncHandler(async (req, res) => {
    const { shortUrl, longUrl, label } = req.body
    if (!longUrl) {
        return res.status(400).json({ message: "Please Provide Longurl" })
    }

    if (!label) {
        return res.status(400).json({ message: "Please Provide Label" })
    }

    if (shortUrl) {
        const result = await Url.findOne({ shortUrl })
        if (result) {
            return res.status(400).json({ message: "please choose another short url" })
        }
    } else {
        console.log(req.body)
        req.body.shortUrl = nanoid(6)
    }

    await Url.create(req.body)
    res.status(201).json({ message: "Url Added Success" })
})



exports.getUserUrl = asyncHandler(async (req, res) => {

    const result = await Url.find({ userId: req.body.userId })

    res.status(200).json({ message: "Url Fetch Success", result })
})



exports.deleteUrl = asyncHandler(async (req, res) => {
    const { urlId } = req.params
    await Url.findByIdAndDelete(urlId)

    res.status(200).json({ message: "Url Delete Success" })
})


exports.updateUrl = asyncHandler(async (req, res) => {
    const { urlId } = req.params
    await Url.findByIdAndUpdate(urlId, req.body, { runValidators: true })

    res.status(200).json({ message: "Url Update Success" })
})