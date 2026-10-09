import { strictObject, string, pipe, email, minLength, maxLength } from "valibot"

export const LoginSchema = strictObject({
    email: pipe(string(), email("")),
    password: pipe(string(), minLength(8, ""), maxLength(20, ""))
})


