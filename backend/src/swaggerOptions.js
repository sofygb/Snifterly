//configuración de swagger que se exportará
export const options = { //Nombre de la API, qué carpetas va a leer, etc
    definition:{
        info:{
            title: "Snifterly API"
        }
    },
    apis: ['./src/routes/**/*.js']
}