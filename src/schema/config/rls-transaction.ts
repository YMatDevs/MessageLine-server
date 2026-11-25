import { sql } from "drizzle-orm";
import { db } from "../../db.js"
import { GetUserId } from "../../utilities/context.js";

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export async function RlsTransaction<T>(query: (transaction: Transaction) => Promise<T>) {

    const user_id = GetUserId();
    console.log("Hello ")
    return await db.transaction(async (transaction) => {
        await transaction.execute(sql`SELECT set_config('app.user_id',${user_id},true)`);

        const temp = await transaction.execute(sql`SELECT current_setting('app.user_id', true)`);
        console.log("DANGER DANGER 💀💀💀💀💀💀💀💀💀")
        console.log(temp);

        const result = await transaction.execute(
    sql`SELECT
        current_user,
        session_user,
        current_setting('app.user_id', true) AS user_id`
);

console.log(result.rows);
        return await query(transaction);
    });

}
