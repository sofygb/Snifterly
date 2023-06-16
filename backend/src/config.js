//configuración de la base de datos (Usuarios y contraseña). Arcivo que se exportará para la conexión de la base de datos
import 'dotenv/config'
import { config as dotenv } from 'dotenv'
dotenv()

/*
ASGURARSE DE TENER EL SIGUIENTE USUARIO:
process.env.SERVER || 'localhost'
process.env.USER || 'text'
process.env.PASSWORD || 'text'
process.env.DATABASE || 'SnifterlyDB'
*/

export const config = {
    host        : process.env.SERVER ,
    user        : process.env.USER,
    password    : process.env.PASSWORD ,
    database    : process.env.DATABASE ,
}

//localhost:3000/docs