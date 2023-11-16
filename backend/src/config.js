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

CONEXIÓN A LA BD MEDIANTE XAMPP & PHPMYADMIN
export const config = {
    host        : 'localhost' ,
    user        : 'root',
    password    : '' ,
    database    : 'snifterlydb' ,
}
CONEXIÓN A LA BD SUBIDA A LA WEB
export const config = {
    host        : 'MYSQL5049.site4now.net' ,
    user        : 'aa0ac9_sniferl',
    password    : 'SnifterlyDB01' ,
    database    : 'db_aa0ac9_sniferl' ,
}
*/

export const config = {
    host        : 'localhost' ,
    user        : 'root',
    password    : '' ,
    database    : 'snifterlydb' ,
}


//localhost:3000/docs