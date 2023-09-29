//archivo de tareas. este va a ser las rutas
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
    getUltimasDosJornadas
} from "../controllers/tasks.js";

const router = Router(); //devuelve lo que se ejecuta en una constante. Router nos permite definir las urls

/**
 * @swagger
 * tags: 
 *  name: Tasks
 *  description: Tasks endpoint
 */

/** 
 * @swagger
 * /usuarios:
 *  get:
 *    summary: Trae todos los usuarios
 *    tags: [Tasks]
 */
router.get("/usuarios", getUsuarios) //get todas las tareas

/** 
 * @swagger
 * /ultimasJornadas/:idUsuario
 *  get:
 *    summary: Trae las ultimas jornadas
 *    tags: [Tasks]
 */
router.get("/ultimasJornadas/:idUsuario", getUltimasDosJornadas)

/** 
 * @swagger
 * /medicionEstado/:idMedicion/:estado:
 *  put:
 *    summary: set estado usuario
 *    tags: [Tasks]
 */
router.put("/medicionEstado/:idMedicion/:estado", setEstadoUsuario)

/** 
 * @swagger
 * /modificarUsuario/:nombre/:fechaNacimiento/:peso/:altura/:email/:contrasenia/:idUsuario
 *  put:
 *    summary: update de los nuevos datos del usuario
 *    tags: [Tasks]
 */
router.put("/modificarUsuario/:nombre/:fechaNacimiento/:peso/:altura/:email/:contrasenia/:idUsuario", updateUsuario)

/** 
 * @swagger
 * /jornadaActual/:idJornada:
 *  put:
 *    summary: update fechaFin
 *    tags: [Tasks]
 */
router.put("/jornadaActual/:idJornada", setFechaFinJornada)

/**
 * @swagger
 * tags: 
 *  name: Tasks
 *  description: Tasks endpoint
 */

/** 
 * @swagger
 * /jornadas:
 *  get:
 *    summary: Trae todas las jornadas
 *    tags: [Tasks]
 */
router.get("/jornadas", getJornadas) //get todas las jornadas

/** 
 * @swagger
 * /jornadas:
 *  get:
 *    summary: Trae la jornada activa si la hay
 *    tags: [Tasks]
 */
router.get("/jornadaActiva2", getJornadaActiva2)

/** 
 * @swagger
 * /jornadaActiva:
 *  get:
 *    summary: Trae la jornada activa
 *    tags: [Tasks]
 */
router.get("/jornadaActiva/:idUsuario", getJornadaActiva) //get jornada activa

/** 
 * @swagger
 * /jornadaActiva:
 *  get:
 *    summary: Trae la jornada activa
 *    tags: [Tasks]
 */
router.get("/jornadaActivaHay/:idUsuario", getHayJornada) //get jornada activa

/** 
 * @swagger
 * /jornadaActiva:
 *  get:
 *    summary: Trae la jornada activa
 *    tags: [Tasks]
 */
router.get("/jornadaReciente/:idUsuario", getJornadaRecienteByIdUsuario) //get jornada activa

/** 
 * @swagger
 * /mediciones/:idJornada:
 *  get:
 *    summary: Trae la cantidad de mediciones de una jornada
 *    tags: [Tasks]
 */
router.get("/mediciones/count/:idJornada", getMedicionesCountByIdJornada)

/** 
 * @swagger
 * /cantjornadas/count/:idUsuario
 *  get:
 *    summary: Trae la cantidad de jornadas de un usuario
 *    tags: [Tasks]
 */
router.get("/cantjornadas/count/:idUsuario", getJornadasCountByIdUsuario)

/** 
 * @swagger
 * /mediciones/first/:idJornada:
 *  get:
 *    summary: Trae la primera medicion más de una jornada
 *    tags: [Tasks]
 */
router.get("/mediciones/first/:idJornada", getFistFechaMedicionByIdJornada)

/** 
 * @swagger
 * /mediciones/last/:idJornada:
 *  get:
 *    summary: Trae la última medicion más de una jornada
 *    tags: [Tasks]
 */
router.get("/mediciones/last/:idJornada", getUltimaMedicionByIdJornada)

/** 
 * @swagger
 * /ultimaMedicion:
 *  get:
 *    summary: Trae la última medición hecha
 *    tags: [Tasks]
 */
router.get("/ultimaMedicion/:idJornada", getUltimaMedicion)

/** 
 * @swagger
 * /mediciones/avg/:idJornada:
 *  get:
 *    summary: Trae el promedio de todos los grados de las mediciones de una jornada 
 *    tags: [Tasks]
 */
router.get("/mediciones/avg/:idJornada", getAvgMedicionesByIdJornada)

/**
 * @swagger
 * tags: 
 *  name: Tasks
 *  description: Tasks endpoint
 */

/** 
 * @swagger
 * /mediciones:
 *  get:
 *    summary: Trae todas las mediciones
 *    tags: [Tasks]
 */
router.get("/mediciones", getMediciones) //get todas las mediciones

/** 
 * @swagger
 * /usuarios/count:
 *  get:
 *    summary: Trae la cantidad total de usuarios
 */
router.get("/usuarios/count", getUsuariosCount) //get la cantidad de tareas

/** 
 * @swagger
 * /usuarios/:idUsuario:
 *  get:
 *    summary: Trae el usuario requerido por su id
 */
router.get("/usuarios/:idUsuario", getUsuarioById) //get una tarea por su id

/** 
 * @swagger
 * /usuarios/:email/:contraseña:
 *  get:
 *    summary: Trae el usuario requerido por su email y contraseña
 */
router.get("/usuarios/:email", getUsuarioByEmail) //NO FUNCIONA

/** 
 * @swagger
 * /usuarios/:email/:contraseña:
 *  get:
 *    summary: Trae el usuario requerido por su email y contraseña
 */
router.get("/getUsuario/:email/:contrasenia", getUsuarioByEmailAndContrasenia)

/** 
 * @swagger
 * /jornadas/:idJornada:
 *  get:
 *    summary: Trae la jornada requerida por su id
 */
router.get("/jornadas/:idJornada", getJornadaById) //get una jornada por su id

/** 
 * @swagger
 * //jornadas/count/:idJornada:
 *  get:
 *    summary: Trae la cantidad de mediciones de una jornada requerida por su id
 */
router.get("/jornadas/count/:idJornada", getMedicionesFromIdJornada)

/** 
 * @swagger
 * /usuarioNuevo:
 *  post:
 *    summary: Crea un nuevo usuario
 */
router.post("/usuarioNuevo/:nombre/:fechaNacimiento/:peso/:altura/:email/:contrasenia", saveUsuario) //crear una tarea

/** 
 * @swagger
 * /mediciones:
 *  post:
 *    summary: Crea una nueva medicion
 */
router.post("/medicion/:grado/:idJornada", saveMedicion) //crear una medicion

/** 
 * @swagger
 * /jornada/:idUsuario
 *  post:
 *    summary: Crea una nueva jornada
 */
router.post("/jornada/:idUsuario", saveJornada) //crear una nueva jornada

/** 
 * @swagger
 * /tasks/:id:
 *  delete:
 *    summary: Elimina el usuario por su id
 */
router.delete("/tasks/:id", deleteTask) //delete una tarea por su id

/** 
 * @swagger
 * /jornadaDesactiva:   
 *  put:
 *    summary: el valor activo pasa a 0
 */
router.put("/jornadaDesactiva", setJornadaDesactiva) //termina la jornada

/**
 * @swagger
 * /medicione/:grado/:idjornada
 *  post:
 *    summary: sube los datos de la nueva medición
 */
router.post("/newMedicion/:grado/:idJornada", setMediciones ) // nueva medición

/** 
 * @swagger
 * /tasks:
 *  put:
 *    summary: Actualiza un usuarios por su id
 */
//router.put("/tasks/:id", updateTask) //modificar una tarea por su id

router.get("/def", def)

export default router;

//para probar las peticiones se puede utilizar un cliente rest como Postman. Instalar la extensión 'REST Client'