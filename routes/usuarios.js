<<<<<<< HEAD
const {Router } = require("express")
const {getUsers } = require("../controllers/usuarios")
const router = Router()

    //http://localhost:4000/api/v1/users/

    router.get("/", getUsers)

    module.exports = router
=======
const {Router} = require("express")
const{getUsers, getUsersByID, deleteUsersByID, signIn, cambio, adduser} = require("../controllers/usuarios")
const router = Router()

router.get("/", getUsers)
router.get("/id/:id", getUsersByID)
router.post("/singing", signIn)
router.post("/", adduser)
router.delete("/id/:id", deleteUsersByID)
router.post("/contra", cambio)
module.exports = router
>>>>>>> af28191 (	modified:   controllers/messages.js)
