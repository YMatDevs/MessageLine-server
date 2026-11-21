import type { messageTable } from "../schema/message.js";


export type Message = typeof messageTable.$inferInsert;