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
    async create(cryptoData, userId){
        return await Crypto.create({ ...cryptoData, owner: userId })
    },
    async del(cryptoId){
        return await Crypto.findByIdAndDelete(cryptoId);
    },
    async buyCrypto(cryptoId, userId){
        const crypto = await Crypto.findById(cryptoId);
    
        if(crypto.owner ==(userId)){
            throw new Error('Cannon prefer own offer');
        }
    
        if(crypto.buyCrypto.includes(userId)){
            throw new Error('You already prefeerred this offer');
        }
    
        crypto.buyCrypto.push(userId);
    
        return crypto.save();
    }
}