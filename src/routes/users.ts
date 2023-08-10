import express from "express"
const router = express.Router();



router.post("/users", function(req, res) {
    const {nome} = req.query

    return res.json("hello post and param: " + nome )
})



export default router;