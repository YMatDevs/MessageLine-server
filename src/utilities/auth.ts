import {bcrypt} from 'bcrypt'
import { SALT_ROUNDS } from './constants.js'


export async function hashPassword(password) : Promise<string>{
    return await bcrypt.hash(password , SALT_ROUNDS);
}

export async function verifyPassword (password , hashedPassword) : Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
}