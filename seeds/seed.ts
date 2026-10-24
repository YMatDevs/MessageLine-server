import 'dotenv/config';
import { db } from '../src/db';
import { userTable } from '../src/db';

import { hashPassword } from '../src/utilities/auth';
import seedUserList from './users.json';




async function seedUser() {

    const users =  await Promise.all(
        seedUserList.map(async  (user) => ({ 
            ...user, 
            password: await hashPassword(user.password) 
        }
        )),
    );
    
    const inserted = await db
    .insert(userTable)
    .values(users)
    .onConflictDoNothing({ target: userTable.email })
    .returning({ email: userTable.email });

    console.log(`Seeded ${inserted.length} user(s)`);

}


function SEED() {
    seedUser();
}


SEED();