<<<<<<< HEAD
const {request, response } = require("express")

const getUsers = (req = request, res = response) => {
      console.log("Funcion getUser")
      res.json({msg: "Funcion getUsers"})
}

module.exports = {getUsers}
=======
const { request, response } = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection");
//http://localhost:4000/api/v1/usuarios
const getUsers= async (req = request, res = response) => {
    let conn;
    
    try{
        conn = await pool.getConnection() //Realizamons la conexion

        //Generamos la consulta
        const users = await conn.query("SELECT * FROM Usuarios", (error) => {if (error) throw error})

        if (users.length===0){ //En caso de no haber registros lo informamos
            res.status(404).json({msg: "No existen usuarios registrados"})
            return
        }

        res.json({users}) //Se manda la lista de usuarios
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg: error}) //Informamos el error
    }
    
    finally{
        if(conn) conn.end() //Termina la conexion
    }
    }

const getUsersByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn;
    
    try{
        conn = await pool.getConnection() //Realizamons la conexion

        //Generamos la consulta
        const [user] = await conn.query(`SELECT * FROM Usuarios WHERE ID = ${id}`, (error) => {if (error) throw error})

        if (!user){ //En caso de no haber registros lo informamos
            res.status(404).json({msg: `No existen usuario registrado con el ID ${id}`})
            return
        }

        res.json({user}) //Se manda la lista de usuarios
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg: error}) //Informamos el error
    }
    
    finally{
        if(conn) conn.end() //Termina la conexion
    }
    }

    const adduser = async (req = request, res = response) =>{
        const {Nombre, 
               Apellidos, 
               Edad, 
               Genero = '', 
               Usuario, 
               Contrasena, 
               Fecha_Nacimiento = '2000-01-01', 
               Activo} = req.body
        
        if(!Nombre|| 
           !Apellidos|| 
           !Edad|| 
           !Genero|| 
           !Usuario|| 
           !Contrasena|| 
           !Activo)
        {
            res.status(400).json({msg:"Faltan Datos"})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)
    
        let conn;
        
        try{
            conn = await pool.getConnection() //Realizamons la conexion
    
            const [userExist] = await conn.query(`SELECT Usuario FROM Usuarios WHERE Usuario = '${Usuario}' `)

            if(userExist){
                res.status(400).json({msg: `El Usuario ${Usuario} ya se encuntra registrado.`})
                return
            }
            //Generamos la consulta
            const result = await conn.query(`INSERT INTO Usuarios(
                Nombre, 
                Apellidos, 
                Edad, 
                Genero, 
                Usuario, 
                Contrasena, 
                Fecha_Nacimiento, 
                Activo) 
            VALUES(
                '${Nombre}', 
                '${Apellidos}', 
                ${Edad}, 
                '${Genero}', 
                '${Usuario}', 
                '${contrasenaCifrada}', 
                '${Fecha_Nacimiento}', 
                '${Activo}'
                )
                `, (error) => {if (error) throw error})
    
            if (result.affectedRows ===0){ //En caso de no haber registros lo informamos
                res.status(400).json({msg: `No se pudo agregar el usuario`})
                return
            }
    
            res.json({msg:`Se agrego satisfactoriamente el usuario`}) //Se manda la lista de usuarios
        }
        catch(error){
            console.log(error)
            res.status(500).json({msg: error}) //Informamos el error
        }
        
        finally{
            if(conn) conn.end() //Termina la conexion
        }
        }

const deleteUsersByID = async (req = request, res = response) =>{
        const {id} = req.params
        let conn;
        
        try{
            conn = await pool.getConnection() //Realizamons la conexion
    
            //Generamos la consulta
            const result = await conn.query(`UPDATE Usuarios SET Activo = 'N' WHERE ID = ${id}`, (error) => {if (error) throw error})
    
            if (result.affectedRows ===0){ //En caso de no haber registros lo informamos
                res.status(404).json({msg: `No existen usuario registrado con el ID ${id}`})
                return
            }
    
            res.json({msg:`Se elimino satisfactoriamente el usuario`}) //Se manda la lista de usuarios
        }
        catch(error){
            console.log(error)
            res.status(500).json({msg: error}) //Informamos el error
        }
        
        finally{
            if(conn) conn.end() //Termina la conexion
        }
        }

        const signIn = async (req = request, res = response) =>{
            const {id} = req.params
            let conn;
            
            try{
                conn = await pool.getConnection() //Realizamons la conexion
        
                //Generamos la consulta
                const [user] = await conn.query(`SELECT * FROM Usuarios WHERE ID = ${id}`, (error) => {if (error) throw error})
        
                if (!user){ //En caso de no haber registros lo informamos
                    res.status(404).json({msg: `No existen usuario registrado con el ID ${id}`})
                    return
                }
        
                res.json({user}) //Se manda la lista de usuarios
            }
            catch(error){
                console.log(error)
                res.status(500).json({msg: error}) //Informamos el error
            }
            
            finally{
                if(conn) conn.end() //Termina la conexion
            }
            }
        
        const cambio = async (req =request, res = response) =>{
            const {usuario,contrasena, contrasenaa} = req.body

            if(!usuario || !contrasena ||!contrasenaa){
                res.statys(400).json({msg:"faltan datos"})
                return
            }

            let conn;

            try{
                conn = await pool.getConnection() //realizamos la conexion

                 //generamos la consulta
                 conts [user] = await conn.query(`SELECT Contrasena,FROM Usuarios = '${Usuario}'`, (error) => {if (error) throw error})

                if(!user){
                res.status(403).json({msg: "Usuario o contraseña incorrectas"})
                return
                }

                const contrasenavalida =bcrypjs.compareSync(contrasena, user.contrasena)
                const salt = bcryptjs.genSaltSync()
                const contrasenaaCifrada = bcryptjs.hashSync(contrasenaa,salt)

                if(!contrasenavalida){
                res.status(403).json({msg: "usuario o contraseña invalida"})
                return

             }

             const result = await conn.query(`Update Usuarios SET, contrasena = '${contrasenaacifrada}') WHERE Usuarios = '${Usuario}'`, (error) => {if (error) throw error})
             res.json({msg:`La contraseña se ha modificado correctamente`}) //se manda ala lista de usuarios
            
            
            }
            catch(error){
                console.log(error)
                res.satus(500).json({msg: error}) //informamos el error
            }

            finally{
                if(conn) conn.end() //termina la conexion
            }
            }

module.exports = {getUsers, getUsersByID, deleteUsersByID, signIn, cambio, adduser}
>>>>>>> af28191 (	modified:   controllers/messages.js)
