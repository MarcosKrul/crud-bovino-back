import { Router } from "express";

const routes = Router();

routes.get('/teste', (req, res) => {
    return res.status(200).send({
        message: 'hello'
    })
})

export default routes;