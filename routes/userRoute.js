const { getUserUrl, addUrl, updateUrl, deleteUrl } = require("../controller/userController")

const router = require("express").Router()

router
    .get("/url", getUserUrl)
    .post("/url-create", addUrl)
    .put("/url-update/:urlId", updateUrl)
    .delete("/url-delete/:urlId", deleteUrl)


module.exports = router