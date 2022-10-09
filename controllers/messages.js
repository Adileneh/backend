const { request, response } = require("express")

const rootMessage = (req = request, res = response) => {
    //http://localhost:4000/api/v1/messages?nombre=Adilene&apellido_paterno=Espinosa
    const {nombre, apellido_paterno} = req.query
    //console.log(req.query)
    if (!nombre) {
        res.status(400).json({
            msg: "Falta indicar el nombre"
        })
        return
    }
    if (!apellido_paterno) {
        res.status(400).json({
            msg: "Falta indicar el apellido paterno"
        })
        return
    }
    res.status(200).json({msg: 'Mi nombre es' + nombre +'' + apellido_paterno})
}

const hiMessage = (req = request, res = response) => {
    //http://localhost:4000/api/v1/messages/hi/Adilene/21
    const {name, edad} = req.params
    //console.log(req.params)
    res.json({msg: 'Hola' + name + '' + edad})
}

const byeMessage = (req = request, res = response) => {
    res.status(201).json({msg: 'Adios Mundo'})
}

const postMessage = (req = request, res = response) => {
    res.status(300).json({msg: 'Mensaje POST'})
}

const putMessage = (req = request, res = response) => {
    res.status(505).json({msg: 'Mensaje PUT'})
}

const deleteMessage = (req = request, res = response) => {
    res.status(405).json({msg: 'Mensaje DELETE'})
}

module.exports = {rootMessage, hiMessage, byeMessage, postMessage, putMessage, deleteMessage}