import { Router } from "express";
import { isAuth } from "../middlewares/auth-middleware.js";
import cryptoService from "../services/crypto-service.js";
import { getErrorMessage } from "../utils/error-unitls.js";
import { isOwner } from "../middlewares/owner-middleware.js";

const cryptoController = Router();

cryptoController.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

cryptoController.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;
    const userId = req.user.id;

    try{
        await cryptoService.create(cryptoData, userId);
        res.redirect('/crypto/catalog');
    }catch(err){
        const error = getErrorMessage(err);
        res.render('crypto/create', { crypto: cryptoData, error });
    }
});

cryptoController.get('/catalog', async (req, res) => {
    const crypto = await cryptoService.getAll();
    res.render('crypto/catalog', { crypto});
});

cryptoController.get('/:cryptoId/details', async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try{
        const crypto = await cryptoService.getOne(cryptoId);

        const isOwner = req.user && req.user.id == crypto.owner;
        const sold = crypto.buyCrypto.includes(req.user?.id);
        
        res.render('crypto/details', { crypto, user: req.user.id, isOwner, sold });
    }catch(err){
        const error = getErrorMessage(err);
        res.render('crypto/catalog', { error });
    }

});

cryptoController.get('/:cryptoId/delete', isAuth, isOwner, async (req, res) => {
    const cryptoId = req.params.cryptoId;

    try{
        await cryptoService.del(cryptoId);
        res.redirect('/crypto/catalog');
    }catch(err){
        res.setError(getErrorMessage(err));
        res.redirect(`/crypto/${cryptoId}/details`);
    }

});

cryptoController.get('/:cryptoId/edit', isAuth, isOwner, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const crypto = await cryptoService.getOne(cryptoId);
    res.render('crypto/edit', { crypto });
})

cryptoController.post('/:cryptoId/edit', isAuth, isOwner, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const cryptoNewData = req.body;

    try{
        await cryptoService.update(cryptoId, cryptoNewData);
        res.redirect(`/crypto/${cryptoId}/details`);
    }catch(err){
        const error = (getErrorMessage(err));
        res.render(`crypto/edit`, { crypto: cryptoNewData, error });
    }
});

cryptoController.get('/:cryptoId/buy', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const userId = req.user.id;

    try{
        await cryptoService.buyCrypto(cryptoId, userId);
    }catch(err){
        res.setError(getErrorMessage(err));
    }

    res.redirect(`/crypto/${cryptoId}/details`);
});

export default cryptoController;