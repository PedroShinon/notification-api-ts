"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const web_push_1 = __importDefault(require("web-push"));
const zod_1 = require("zod");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient()
const router = express_1.default.Router();
//WebPush.generateVAPIDKeys();
const urlfront = process.env.FRONTURL || 'https://microcell-8sjaqk37d-yraffic02.vercel.app/';
const publicKey = 'BNDcqDNFUP14-910AzOdUT3DzgdTez2eiWvrkJKFRtPIU2i0PQgtwBtXFDvsfOFXa1L3Fd548gLkh-yMDRkI2ps';
const privateKey = 'zADv389I3dWTex_I-FJwRkGHNRpIXC99bsiLT2BBbqI';
web_push_1.default.setVapidDetails(urlfront, publicKey, privateKey);
router.get("/push/public_key", function (req, res) {
    return res.status(200).json(publicKey);
});
router.post("/push/register", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        return res.status(200).json();
    });
});
router.post("/push/send", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sendPushBody = zod_1.z.object({
            subscription: zod_1.z.object({
                endpoint: zod_1.z.string(),
                keys: zod_1.z.object({
                    p256dh: zod_1.z.string(),
                    auth: zod_1.z.string()
                })
            })
        });
        const { subscription } = sendPushBody.parse(req.body);
        const { name } = req.body;
        web_push_1.default.sendNotification(subscription, name);
        return res.json("Notificação enviada");
    });
});
exports.default = router;
