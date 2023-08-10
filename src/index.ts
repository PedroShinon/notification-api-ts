import express from "express"
import {config} from "dotenv"
import cors from "cors"
import userRoute from "./routes/users";
import notificationRoute from "./routes/notifications-routes";

config();
const app = express();
app.use(express.json())
app.use(cors())

//port
const port = process.env.PORT || 8000;
//listen
app.listen(port, () => console.log(`servidor rodando na porta ${port}`))

//rotas
app.use('/', userRoute)
app.use('/', notificationRoute)



