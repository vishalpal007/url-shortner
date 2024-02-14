const { adminGetAllUsers, adminGetUrl, adminUpdateUser } = require("../controller/adminController")

const router = require("express").Router()



router
    .get("/user", adminGetAllUsers)
    .get("/user/url/:userId", adminGetUrl)
    .put("/user/:userId", adminUpdateUser)


module.exports = router