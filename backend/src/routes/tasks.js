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
    saveJornada
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
 * /jornadaActiva:
 *  get:
 *    summary: Trae la jornada activa
 *    tags: [Tasks]
 */
router.get("/jornadaActiva", getJornadaActiva) //get jornada activa

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
 * /mediciones/first/:idJornada:
 *  get:
 *    summary: Trae la primera fecha de la medicion más antigua de una jornada
 *    tags: [Tasks]
 */
router.get("/mediciones/first/:idJornada", getFistFechaMedicionByIdJornada)

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
 * /usuarios:
 *  post:
 *    summary: Crea un nuevo usuario
 */
router.post("/usuarios", saveUsuario) //crear una tarea

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
 * /tasks:
 *  put:
 *    summary: Actualiza un usuarios por su id
 */
//router.put("/tasks/:id", updateTask) //modificar una tarea por su id

router.get("/def", def)

export default router;

//para probar las peticiones se puede utilizar un cliente rest como Postman. Instalar la extensión 'REST Client'