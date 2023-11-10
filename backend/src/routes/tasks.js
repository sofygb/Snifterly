//archivo de tareas. este va a ser las rutas
//http://localhost:3000/docs/#/ 
import { Router } from "express";
import { 
    saveUsuario, 
    deleteTask, 
    getUsuarioById, 
    getUsuariosCount, 
    getUsuarios, 
    getJornadas, 
    updateTask, 
    saveMedicion, 
    getJornadaById, 
    def, 
    getMediciones, 
    getMedicionesFromIdJornada, 
    getMedicionesCountByIdJornada,
    getAvgMedicionesByIdJornada,
    getFistFechaMedicionByIdJornada,
    getUsuarioByEmail,
    getJornadaActiva,
    saveJornada,
    setJornadaDesactiva,
    setMediciones,
    setEstadoUsuario,
    getUltimaMedicion,
    getUsuarioByEmailAndContrasenia,
    getJornadaRecienteByIdUsuario,
    getUltimaMedicionByIdJornada,
    setFechaFinJornada,
    getHayJornada,
    getJornadaActiva2,
    updateUsuario,
    getJornadasCountByIdUsuario,
    getUltimasDosJornadas,
    getJornadaByIdUsuario,
    getJornadasYMediciones,
    setModResitenciaUsuario,
} from "../controllers/tasks.js";

const router = Router(); //devuelve lo que se ejecuta en una constante. Router nos permite definir las urls

/**
 * @swagger
 * tags: 
 *  name: Usuario
 *  description: Endpoints de Usuario
 */
/**
 * @swagger
 * tags: 
 *  name: Jornada
 *  description: Endpoints de Jornada
 */
/**
 * @swagger
 * tags: 
 *  name: Medicion
 *  description: Endpoints de Medicion
 */

/** 
 * @swagger
 * /usuarios:
 *  get:
 *    summary: Trae todos los usuarios
 *    tags: [Usuario]
 */
router.get("/usuarios", getUsuarios) //get todas los usuarios

/** 
 * @swagger
 * /ultimasJornadas/:idUsuario
 *  get:
 *    summary: Trae las ultimas dos jornadas dado un idUsuario
 *    tags: [Jornada]
 */
router.get("/ultimasJornadas/:idUsuario", getUltimasDosJornadas)

/** 
 * @swagger
 * /medicionEstado/:idMedicion/:estado:
 *  put:
 *    summary: Actualiza el grado y el estado de una medición
 *    tags: [Medicion]
 */
router.put("/medicionEstado/:idMedicion/:estado", setEstadoUsuario)

/** 
 * @swagger
 * /modificarUsuario/:nombre/:fechaNacimiento/:peso/:altura/:email/:contrasenia/:idUsuario
 *  put:
 *    summary: Actualización con los nuevos datos del usuario
 *    tags: [Usuario]
 */
router.put("/modificarUsuario/:nombre/:fechaNacimiento/:peso/:altura/:email/:contrasenia/:idUsuario", updateUsuario)

/** 
 * @swagger
 * /jornadaActual/:idJornada:
 *  put:
 *    summary: Finaliza la jornada activa
 *    tags: [Jornada]
 */
router.put("/jornadaActual/:idJornada", setFechaFinJornada)

/** 
 * @swagger
 * /jornadas:
 *  get:
 *    summary: Trae todas las jornadas
 *    tags: [Jornada]
 */
router.get("/jornadas", getJornadas) //get todas las jornadas

/** 
 * @swagger
 * /jornadaActiva2:
 *  get:
 *    summary: Trae la jornada activa si la hay
 *    tags: [Jornada]
 */
router.get("/jornadaActiva2", getJornadaActiva2)

/** 
 * @swagger
 * /jornadaActiva/:idUsuario:
 *  get:
 *    summary: Trae la jornada activa de un usuario
 *    tags: [Jornada]
 */
router.get("/jornadaActiva/:idUsuario", getJornadaActiva)

/** 
 * @swagger
 * /jornadaActivaHay/:idUsuario:
 *  get:
 *    summary: Trae la jornada activa de un usuario (si la hay)
 *    tags: [Jornada]
 */
router.get("/jornadaActivaHay/:idUsuario", getHayJornada)

/** 
 * @swagger
 * /jornadaReciente/:idUsuario:
 *  get:
 *    summary: Trae todo sobre la ultima jornada terminada de un usuario
 *    tags: [Jornada]
 */
router.get("/jornadaReciente/:idUsuario", getJornadaRecienteByIdUsuario)

/** 
 * @swagger
 * /jornada/usuario/:idUsuario:
 *  get:
 *    summary: Trae las jornadas de un usuario
 *    tags: [Jornada]
 */
router.get("/jornada/usuario/:idUsuario", getJornadaByIdUsuario) //get jornada activa

/** 
 * @swagger
 * /mediciones/count/:idJornada:
 *  get:
 *    summary: Trae la cantidad de mediciones de una jornada
 *    tags: [Medicion]
 */
router.get("/mediciones/count/:idJornada", getMedicionesCountByIdJornada)

/** 
 * @swagger
 * /cantjornadas/count/:idUsuario:
 *  get:
 *    summary: Trae la cantidad de jornadas de un usuario
 *    tags: [Jornada]
 */
router.get("/cantjornadas/count/:idUsuario", getJornadasCountByIdUsuario)

/** 
 * @swagger
 * /mediciones/first/:idJornada:
 *  get:
 *    summary: Trae la fecha de una jornada donde la fecha sea la más vieja
 *    tags: [Medicion]
 */
router.get("/mediciones/first/:idJornada", getFistFechaMedicionByIdJornada)

/** 
 * @swagger
 * /mediciones/last/:idJornada:
 *  get:
 *    summary: Trae la última medicion de una jornada
 *    tags: [Medicion]
 */
router.get("/mediciones/last/:idJornada", getUltimaMedicionByIdJornada)

/** 
 * @swagger
 * /ultimaMedicion/:idJornada:
 *  get:
 *    summary: Trae la última medición hecha en una determinada jornada
 *    tags: [Medicion]
 */
router.get("/ultimaMedicion/:idJornada", getUltimaMedicion)

/** 
 * @swagger
 * /mediciones/avg/:idJornada:
 *  get:
 *    summary: Trae el promedio de todos los grados de las mediciones de una jornada 
 *    tags: [Medicion]
 */
router.get("/mediciones/avg/:idJornada", getAvgMedicionesByIdJornada)

/** 
 * @swagger
 * /mediciones:
 *  get:
 *    summary: Trae todas las mediciones
 *    tags: [Medicion]
 */
router.get("/mediciones", getMediciones) //get todas las mediciones

/** 
 * @swagger
 * /usuarios/count:
 *  get:
 *    summary: Trae la cantidad total de usuarios
 *    tags: [Usuario]
 */
router.get("/usuarios/count", getUsuariosCount) //get la cantidad de tareas

/** 
 * @swagger
 * /usuarios/:idUsuario:
 *  get:
 *    summary: Trae el usuario requerido por su id
 *    tags: [Usuario]
 */
router.get("/usuarios/:idUsuario", getUsuarioById) //get una tarea por su id

/** 
 * @swagger
 * /usuarios/:email:
 *  get:
 *    summary: Trae el usuario requerido por su email
 *    tags: [Usuario]
 */
router.get("/usuarios/:email", getUsuarioByEmail) //NO FUNCIONA

/** 
 * @swagger
 * /usuarios/:email/:contraseña:
 *  get:
 *    summary: Trae el usuario requerido por su email y contraseña
 *    tags: [Usuario]
 */
router.get("/getUsuario/:email/:contrasenia", getUsuarioByEmailAndContrasenia)

/** 
 * @swagger
 * /jornadas/:idJornada:
 *  get:
 *    summary: Trae la jornada requerida por su id
 *    tags: [Jornada]
 */
router.get("/jornadas/:idJornada", getJornadaById) //get una jornada por su id

/** 
 * @swagger
 * /jornadas/count/:idJornada:
 *  get:
 *    summary: Trae la cantidad de mediciones de la jornada requerida
 *    tags: [Jornada, Medicion]
 */
router.get("/jornadas/count/:idJornada", getMedicionesFromIdJornada)

/** 
 * @swagger
 * /jornadasYMediciones/:idUsuario:
 *  get:
 *    summary: Trae todas las mediciones y todas las jornadas de un usuario en especifico
 *    tags: [Jornada, Medicion]
 */
router.get("/jornadasYMediciones/:idUsuario", getJornadasYMediciones)

/** 
 * @swagger
 * /usuarioNuevo/:nombre/:fechaNacimiento/:peso/:altura/:email/:contrasenia:
 *  post:
 *    summary: Crea un nuevo usuario
 *    tags: [Usuario]
 */
router.post("/usuarioNuevo/:nombre/:fechaNacimiento/:peso/:altura/:email/:contrasenia", saveUsuario)

/** 
 * @swagger
 * /medicion/:grado/:idJornada:
 *  post:
 *    summary: Crea una nueva medicion
 *    tags: [Medicion]
 */
router.post("/medicion/:grado/:idJornada", saveMedicion) //crear una medicion

/** 
 * @swagger
 * /jornada/:idUsuario
 *  post:
 *    summary: Crea una nueva jornada
 *    tags: [Jornada]
 */
router.post("/jornada/:idUsuario", saveJornada) //crear una nueva jornada

/** 
 * @swagger
 * /usuario/:idUsuario:
 *  delete:
 *    summary: Elimina un usuario por su id
 *    tags: [Usuario]
 */
router.delete("/usuario/:idUsuario", deleteTask) //delete una tarea por su id

/** 
 * @swagger
 * /jornadaDesactiva:   
 *  put:
 *    summary: Desactiva la jornada activa
 *    tags: [Jornada]
 */
router.put("/jornadaDesactiva", setJornadaDesactiva) //termina la jornada

/** 
 * @swagger
 * /modResistencia/:modResistencia/:idUsuario:   
 *  put:
 *    summary: actualiza el límite de alcohol del usuario
 *    tags: [Usuario]
 */
router.put("/modResistencia/:modResistencia/:idUsuario", setModResitenciaUsuario) //termina la jornada

/**
 * @swagger
 * /newMedicion/:grado/:idJornada:
 *  post:
 *    summary: Crea los datos de la nueva medición
 *    tags: [Medicion]
 */
router.post("/newMedicion/:grado/:idJornada", setMediciones ) // nueva medición

router.get("/def", def)

export default router;

//para probar las peticiones se puede utilizar un cliente rest como Postman. Instalar la extensión 'REST Client'