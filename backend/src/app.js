//archivo que va a contener la config de express
import express from "express";
import cors from "cors"
import morgan from "morgan";
import { options } from "./swaggerOptions.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express"

const specs = swaggerJSDoc(options);

import taskRoutes from "./routes/tasks.js";

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json()) //Permite entender las requests

app.use(taskRoutes)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

export default app;