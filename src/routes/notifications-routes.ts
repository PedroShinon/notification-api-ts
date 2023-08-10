import express from "express"
import WebPush from "web-push"
import {z} from "zod"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const router = express.Router();

//WebPush.generateVAPIDKeys();

const publicKey = 'BNDcqDNFUP14-910AzOdUT3DzgdTez2eiWvrkJKFRtPIU2i0PQgtwBtXFDvsfOFXa1L3Fd548gLkh-yMDRkI2ps'
const privateKey = 'zADv389I3dWTex_I-FJwRkGHNRpIXC99bsiLT2BBbqI'

WebPush.setVapidDetails('https://microcell-8sjaqk37d-yraffic02.vercel.app/', publicKey, privateKey)



router.get("/push/public_key", function(req, res) {
    return res.status(200).json(publicKey)
})

router.post("/push/register", async function(req, res) {
    const { endpoint, keys  } = req.body
    const subscription =  await prisma.subscription.create({ data: {
        endpoint: endpoint,
        p256dh: keys.p256dh,
        auth: keys.auth

    }})

     return res.send(subscription)
})




router.post("/push/send", async function(req, res) {
    const sendPushBody = z.object({
        subscription: z.object({
            endpoint: z.string(),
                keys: z.object({
                    p256dh: z.string(),
                    auth: z.string()
                })
        })
    })

    const {subscription} = sendPushBody.parse(req.body)
    const { name } = req.body


    WebPush.sendNotification(subscription, name)

    return res.json("Notificação enviada")



})



export default router;