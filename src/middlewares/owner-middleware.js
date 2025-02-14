import cryptoService from "../services/crypto-service.js";


export const isOwner = async (req, res, next) => {
    const crypto = await cryptoService.getOne(req.params.volcanoId);

    if(! crypto.owner.equals(req.user.id)){
        res.setError('You are not owner of this offer');
        return res.redirect(`/volcanoes/${crypto.id}/details`);
    }

    req.crypto = crypto;

    next();
}