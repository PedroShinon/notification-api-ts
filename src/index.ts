import express from "express"
import {config} from "dotenv"
import userRoute from "./routes/users";
import notificationRoute from "./routes/notifications-routes";

config();
const app = express();
app.use(express.json())

//port
const port = process.env.PORT || 8000;
//listen
app.listen(port, () => console.log(`servidor rodando na porta ${port}`))

//rotas
app.use('/', userRoute)
app.use('/', notificationRoute)



