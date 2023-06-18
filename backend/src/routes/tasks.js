//archivo de tareas. este va a ser las rutas
import { Router } from "express";
import { saveUsuario, deleteTask, getUsuarioById, getUsuariosCount, getUsuarios, getJornadas, updateTask, saveMedicion, getJornadaById, def, getMediciones, getMedicionesFromIdJornada } from "../controllers/tasks.js";

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
router.post("/mediciones", saveMedicion) //crear una medicion

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
router.put("/tasks/:id", updateTask) //modificar una tarea por su id

router.get("/def", def)

export default router;

//para probar las peticiones se puede utilizar un cliente rest como Postman. Instalar la extensión 'REST Client'