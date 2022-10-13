const {request, response } = require("express")

const getUsers = (req = request, res = response) => {
      console.log("Funcion getUser")
      res.json({msg: "Funcion getUsers"})
}

module.exports = {getUsers}