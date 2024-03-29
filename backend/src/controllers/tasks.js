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
export const getJornadaActiva2 = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Jornada WHERE activo = 1")
    res.json(rows)

    console.log(rows)
}
export const setJornadaActiva = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("INSERT INTO jornada(fechaInicio, fechaFin, idUsuario, activo) VALUES (NOW(),null,?,1)",[
        req.params.idUsuario,
    ])
    res.json(rows)

    console.log(rows)
}

export const getUltimasDosJornadas = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT jornada.*, medicion.idMedicion AS primeraMedicion, medicion.grado AS primerGrado, medicion.fecha AS primeraFecha, medicion.estado AS primerEstado, AVG(grado) AS promedioGrados, MAX(idMedicion) AS ultimaMedicion, (SELECT grado FROM medicion WHERE idJornada = jornada.idJornada ORDER BY fecha DESC LIMIT 1) AS ultimoGrado, (SELECT fecha FROM medicion WHERE idJornada = jornada.idJornada ORDER BY fecha DESC LIMIT 1) AS ultimaFecha, (SELECT estado FROM medicion WHERE idJornada = jornada.idJornada ORDER BY fecha DESC LIMIT 1) AS ultimoEstado, MAX(grado) AS mayorGrado, (SELECT idMedicion FROM medicion WHERE idJornada = jornada.idJornada AND grado = (SELECT MAX(grado) FROM medicion WHERE idJornada = jornada.idJornada) ORDER BY fecha DESC LIMIT 1) AS mayorMedicion, (SELECT fecha FROM medicion WHERE idJornada = jornada.idJornada AND grado = (SELECT MAX(grado) FROM medicion WHERE idJornada = jornada.idJornada) ORDER BY fecha DESC LIMIT 1) AS mayorFecha, (SELECT estado FROM medicion WHERE idJornada = jornada.idJornada AND grado = (SELECT MAX(grado) FROM medicion WHERE idJornada = jornada.idJornada) ORDER BY fecha DESC LIMIT 1) AS mayorEstado FROM jornada INNER JOIN medicion ON jornada.idJornada = medicion.idJornada WHERE idUsuario = ? GROUP BY jornada.idJornada ORDER BY idMedicion desc LIMIT 2", [
	req.params.idUsuario,
    ])
    res.json(rows)
    console.log(rows)
}

export const getJornadasYMediciones = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT jornada.*, medicion.idMedicion AS primeraMedicion, medicion.grado AS primerGrado, medicion.fecha AS primeraFecha, medicion.estado AS primerEstado, AVG(grado) AS promedioGrados, MAX(idMedicion) AS ultimaMedicion, (SELECT grado FROM medicion WHERE idJornada = jornada.idJornada ORDER BY fecha DESC LIMIT 1) AS ultimoGrado, (SELECT fecha FROM medicion WHERE idJornada = jornada.idJornada ORDER BY fecha DESC LIMIT 1) AS ultimaFecha, (SELECT estado FROM medicion WHERE idJornada = jornada.idJornada ORDER BY fecha DESC LIMIT 1) AS ultimoEstado, MAX(grado) AS mayorGrado, (SELECT idMedicion FROM medicion WHERE idJornada = jornada.idJornada AND grado = (SELECT MAX(grado) FROM medicion WHERE idJornada = jornada.idJornada) ORDER BY fecha DESC LIMIT 1) AS mayorMedicion, (SELECT fecha FROM medicion WHERE idJornada = jornada.idJornada AND grado = (SELECT MAX(grado) FROM medicion WHERE idJornada = jornada.idJornada) ORDER BY fecha DESC LIMIT 1) AS mayorFecha, (SELECT estado FROM medicion WHERE idJornada = jornada.idJornada AND grado = (SELECT MAX(grado) FROM medicion WHERE idJornada = jornada.idJornada) ORDER BY fecha DESC LIMIT 1) AS mayorEstado FROM jornada INNER JOIN medicion ON jornada.idJornada = medicion.idJornada WHERE idUsuario = ? GROUP BY jornada.idJornada ORDER BY fechaFin, idMedicion", [
	req.params.idUsuario,
    ])
    res.json(rows)
    console.log(rows)
}

export const setJornadaDesactiva = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("UPDATE jornada SET activo = 0")
    res.json(rows[0])

    console.log(rows[0])
}

export const setFechaFinJornada = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("UPDATE jornada SET fechaFin = NOW() WHERE idJornada = ?", [
        req.params.idJornada,
    ])
    res.json(rows[0])

    console.log(rows[0])
}

export const setMediciones = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("INSERT INTO medicion(grado, fecha, idJornada, estado) VALUES (?,NOW(),?,null)", [
        req.params.grado,
        req.params.idJornada,
    ])
    res.json(rows)
    console.log(rows)
}

export const setEstadoUsuario = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("UPDATE medicion SET estado = ? where idMedicion = ?", [
        req.params.estado,
        req.params.idMedicion,
    ])
    res.json(rows[0])

    console.log(rows[0])
}

export const setModResitenciaUsuario = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("UPDATE usuario SET modResistencia = ? where idUsuario = ?", [
        req.params.modResistencia,
        req.params.idUsuario,
    ])
    res.json(rows[0])

    console.log(rows[0])
}

export const getMediciones = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Medicion")
    res.json(rows)

    console.log(rows)
}

export const getUltimaMedicion = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM `medicion` WHERE idJornada = ? ORDER BY fecha DESC LIMIT 1",[
        req.params.idJornada,
    ])
    res.json(rows[0])

    console.log(rows[0])
}

export const getHayJornada = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT activo FROM `jornada` WHERE idUsuario = 11 ORDER BY fechaInicio DESC LIMIT 1",[
        req.params.idUsuario,
    ])
    res.json(rows[0]["activo"])

    console.log(rows[0]["activo"])
}

export const getAllMedicionesByIdJornada = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM `medicion` WHERE idJornada = ? ORDER BY fecha DESC LIMIT 1",[
        req.params.idJornada,
    ])
    res.json(rows[0])

    console.log(rows[0])
}

export const getUsuarioById = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Usuario WHERE idUsuario = ?", [
        req.params.idUsuario,
    ])
    res.json(rows[0])

    console.log(rows[0])
}
export const getUsuarioByEmail = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Usuario WHERE email = ?", [
        req.params.email,
    ])
    res.json(rows[0])

    console.log(rows[0])
}
export const getUsuarioByEmailAndContrasenia = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Usuario WHERE email = ? AND contrasenia = ?", [
        req.params.email,
        req.params.contrasenia,
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
export const getJornadaByIdUsuario = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Jornada WHERE idUsuario = ?", [
        req.params.idUsuario,
    ])
    res.json(rows)

    console.log(rows)
}
export const getJornadaRecienteByIdUsuario = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Jornada WHERE idUsuario = ? ORDER BY fechaInicio DESC LIMIT 1", [
        req.params.idUsuario,
    ])
    res.json(rows[0])

    console.log(rows[0])
}
export const getJornadaActiva = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT idJornada FROM Jornada WHERE idUsuario = ? AND activo = 1", [
    req.params.idUsuario
    ]) //Ni no hay jornada activa tira error y crashea la BD. SOLUCIONAR
    res.json(rows[0])
    console.log(rows[0]) 
}
export const getUsuariosCount = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT COUNT(*) FROM Usuario")
    res.json(rows[0]["COUNT(*)"])

    console.log(rows[0]["COUNT(*)"])
}
export const getAvgMedicionesByIdJornada = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT TRUNCATE(AVG(grado), 2) FROM medicion WHERE idJornada = ?", [
        req.params.idJornada,
    ])
    res.json(rows[0]["TRUNCATE(AVG(grado), 2)"])

    console.log(rows[0]["TRUNCATE(AVG(grado), 2)"])
}
export const getFistFechaMedicionByIdJornada = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT fecha FROM medicion WHERE idJornada = ? ORDER BY fecha ASC LIMIT 1", [
        req.params.idJornada,
    ])
    res.json(rows[0])

    console.log(rows[0])
}
export const getMedicionesCountByIdJornada = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT COUNT(*) FROM Medicion WHERE idJornada = ?", [
        req.params.idJornada,
    ])
    res.json(rows[0]["COUNT(*)"])

    console.log(rows[0]["COUNT(*)"])
}
export const getJornadasCountByIdUsuario = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT COUNT(*) FROM jornada WHERE idUsuario = ?", [
        req.params.idUsuario,
    ])
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
export const getUltimaMedicionByIdJornada = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("SELECT * FROM Medicion WHERE idJornada = ? ORDER BY fecha DESC LIMIT 1", [
        req.params.idJornada,
    ])

    //JSON.stringify(res.outputData) === '[]' ? res.json([]) : res.json(rows[0])

    res.json(rows)

    console.log(rows)
}

export const saveUsuario = async (req, res) => {
    const connection = await connect()
    const result = await connection.query("INSERT INTO Usuario(nombre, fechaNacimiento, peso, altura, email, contrasenia, fechaCreacion, modResistencia) VALUES (?,?,?,?,?,?,NOW(),null)", [
        req.params.nombre,
        req.params.fechaNacimiento,
        req.params.peso,
        req.params.altura,
        req.params.email,
        req.params.contrasenia,
    ])
    res.json(result)

    console.log(result)
}
export const saveMedicion = async (req, res) => {
    const connection = await connect()
    const result = await connection.query("INSERT INTO Medicion(grado, fecha, idJornada) VALUES (?,NOW(),?)", [
        req.params.grado,
        req.params.idJornada,
    ])
    res.json(result)

    console.log(result)
}
export const saveJornada = async (req, res) => {
    console.log(req.body)
    const connection = await connect();
    const nuevaJornada = await connection.query("INSERT INTO Jornada(fechaInicio, fechaFin, idUsuario, activo) VALUES (NOW(),?,?,1)", [
        null,
        req.params.idUsuario]
    );
    res.json(nuevaJornada);
}
export const updateUsuario = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query("UPDATE usuario SET nombre = ?, fechaNacimiento = ?, peso = ?, altura = ?, email = ?, contrasenia = ? where idUsuario = ?", [
        req.params.nombre,
        req.params.fechaNacimiento,
        req.params.peso,
        req.params.altura,
        req.params.email,
        req.params.contrasenia,
        req.params.idUsuario,
    ])
    res.json(rows[0])

    console.log(rows[0])
}
export const deleteTask = async (req, res) => {
    res.send("hello world");
}
export const updateEstadoMedicion = async (req, res) => { //PENDIENTE
    res.send("hello world");
}

export const def = async (req, res) => {
    await res.send("hello world");
}

