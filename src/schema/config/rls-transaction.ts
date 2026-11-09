import { sql } from "drizzle-orm";
import { db } from "../../db.js"
import { GetUserId } from "../../utilities/context.js";

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export async function RlsTransaction<T>(query: (transaction: Transaction) => Promise<T>) {

    const user_id = GetUserId();

    return await db.transaction(async (transaction) => {
        await transaction.execute(sql`SELECT set_config('app.user_id',${user_id},true)`);

        return await query(transaction);
    });
}
