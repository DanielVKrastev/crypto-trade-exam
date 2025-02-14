import { Router } from "express";

const cryptoController = Router();

cryptoController.get('/create', (req, res) => {
    res.render('crypto/create');
});

export default cryptoController;