//http://localhost:4000/api/v1/messages/

const {Router} = require('express')
const router = Router()
const {rootMessage, hiMessage, byeMessage, postMessage, putMessage, deleteMessage} = require('../controllers/messages')

    router.get('/', rootMessage)//End Point//consultas

    router.get('/hi', hiMessage) //End Point

    router.get('/bye', byeMessage) //End Point

    router.post('/', postMessage) //crear o añadir registros

    router.put('/', putMessage) //actualizar registros

    router.delete('/', deleteMessage) //eliminar registros

    module.exports = router