import Crypto from "../models/crypto-model.js";

export default {
    getAll(filter = {}){
        let query = Crypto.find({});

        return query;
    },
    async getOne(cryptoId){
        const result = await Crypto.findById(cryptoId);
        return result;
    },
    async update(cryptoId, updateData){
        return await Crypto.findByIdAndUpdate(cryptoId, updateData, { runValidators: true });
    },
    create(cryptoData, userId){
        return Crypto.create({ ...cryptoData, owner: userId })
    },
    async del(cryptoId){
        return await Crypto.findByIdAndDelete(cryptoId);
    },
}