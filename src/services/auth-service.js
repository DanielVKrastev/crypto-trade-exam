import bcrypt from 'bcrypt';

import User from '../models/user-model.js';
import { generateToken } from '../utils/auth-unils.js';

export default {
    async register(userData) {
        
        if(userData.password !== userData.rePassword){
            throw new Error('Password mismatch');
        }

        const user = await User.findOne({ email: userData.email })
                                .select({ _id: true });
        
        if(user){
            throw new Error('User already exists');
        }

        const createdUser = await User.create(userData);

        const token = generateToken(createdUser);
        return token;
    },
    async login(email, password){
        const user = await User.findOne({email});
        if(! user){
            throw new Error('Invalid email');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if(! isValid){
            throw new Error('Invalid email');
        }

        const token = generateToken(user);
        return token;
    },
}
