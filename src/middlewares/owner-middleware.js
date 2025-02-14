import cryptoService from "../services/crypto-service.js";

export const isOwner = async (req, res, next) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);

    if(! crypto.owner.equals(req.user.id)){
        res.setError('You are not owner of this offer');
        return res.redirect(`/crypto/${crypto.id}/details`);
    }

    req.crypto = crypto;

    next();
}