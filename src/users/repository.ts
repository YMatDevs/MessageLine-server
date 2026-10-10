
import { db } from '../db.js';
import { userTable } from '../schema/users.js';
import { eq } from 'drizzle-orm';




export const get = {

    byEmail: async (email : string) => { 
        return db.select().from(userTable).where(eq(userTable.email, email))
    },

    byUserId: async (user_id: string)=> {
        return db.select().from(userTable).where(eq(userTable.user_id, user_id))
    }
}


