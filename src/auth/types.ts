import type { InferInput } from "valibot";
import type { LoginSchema } from "./schema.js";

export type Login = InferInput<typeof LoginSchema>;




