//archivo de tareas. este va a ser las funciones de las rutas
import { connect } from "../database.js"; //Llama a la función para conectarme

export const getUsuarios = async (req, res) => {
    const connection = await connect() //me conecto a la bd
    const [rows] = await connection.query("SELECT * FROM Usuario") //con el objeto de conexión hago la consulta
    res.json(rows)

    console.log(rows)
}
export const getJornadas = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Jornada")
    res.json(rows)
    
    console.log(rows)
}
export const getMediciones = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Medicion")
    res.json(rows)

    console.log(rows)
}
export const getUsuarioById = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Usuario WHERE idUsuario = ?", [
        req.params.idUsuario,
    ])
    res.json(rows[0])

    console.log(rows[0])
}
export const getJornadaById = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Jornada WHERE idJornada = ?", [
        req.params.idJornada,
    ])
    res.json(rows[0])

    console.log(rows[0])
}
export const getUsuariosCount = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT COUNT(*) FROM Usuario")
    res.json(rows[0]["COUNT(*)"])

    console.log(rows[0]["COUNT(*)"])
}
export const getMedicionesFromIdJornada = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Medicion WHERE idJornada = ?", [
        req.params.idJornada,
    ])
    res.json(rows)

    console.log(rows)
}

export const saveUsuario = async (req, res) => {
    const connection = await connect()
    const result = await connection.query("INSERT INTO Usuario(idUsuario, nombre, fechaNacimiento, peso, altura, email, contraseña, fechaCreacion, modResistencia) VALUES (?,?,?,?,?,?,?,?,?)", [
        req.body.idUsuario,
        req.body.nombre,
        req.body.fechaNacimiento,
        req.body.peso,
        req.body.altura,
        req.body.email,
        req.body.contraseña,
        req.body.fechaCreacion,
        req.body.modResistencia
    ])
    res.json(result)

    console.log(result)
}
export const saveMedicion = async (req, res) => {
    const connection = await connect()
    const result = await connection.query("INSERT INTO Medicion(idMedicion, grado, fecha, idJornada) VALUES (?,?,?,?)", [
        req.body.idMedicion,
        req.body.grado,
        req.body.fecha,
        req.body.idJornada,
    ])
    res.json(result)

    console.log(result)
}
export const deleteTask = async (req, res) => {
    res.send("hello world");
}
export const updateTask = async (req, res) => {
    res.send("hello world");
}

export const def = async (req, res) => {
    await res.send("hello world");
}
