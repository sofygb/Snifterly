//archivo que sirve para conectar la base de datos. DESCARGAR Docker(Mejor) o XAMPP para descargar MySql.
import mysql from 'mysql2/promise';
import { config } from "./config.js"; 

export const connect = async () => {
    return await mysql.createConnection(config)
}
