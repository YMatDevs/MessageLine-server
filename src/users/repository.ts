
import { db } from '../db.js';
import { userTable } from '../schema/users.js';
import { eq, inArray } from 'drizzle-orm';








export const UserRepository = {
    get : {
        byEmail: async (email : string) => { 
        return db.select().from(userTable).where(eq(userTable.email, email))
    },

    byUserIds: async (user_ids: string[]) => {
        if(user_ids.length === 0) return [];
        return db.select().from(userTable).where(inArray(userTable.user_id, user_ids));
    }
    }
}


