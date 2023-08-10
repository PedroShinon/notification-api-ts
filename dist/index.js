"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routes/users"));
const notifications_routes_1 = __importDefault(require("./routes/notifications-routes"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//port
const port = process.env.PORT || 8000;
//listen
app.listen(port, () => console.log(`servidor rodando na porta ${port}`));
//rotas
app.use('/', users_1.default);
app.use('/', notifications_routes_1.default);
