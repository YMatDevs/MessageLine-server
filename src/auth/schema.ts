import { strictObject, string, pipe, email, minLength, maxLength, regex } from "valibot"

const PasswordSchema = pipe(
    string(), minLength(8, "Password length must be atleast 8 characters"), 
    maxLength(20, "Password length must be maximum of 20 characters"), 
    regex(/[a-z]/, "Password must contain ateast one lowercase character"),
    regex(/[A-Z]/, "Password must contain ateast one uppercase character"),
    regex(/[0-9]/, "Password must contain ateast one digit"),
    regex(/[!@#$%^&*]/, "Password must contain atleast one special character"),
);

export const LoginSchema = strictObject({
    email: pipe(string(), email("")),
    password: PasswordSchema,
})


export const RegisterSchema = strictObject({
    email: pipe(string(), email("")),
    password: PasswordSchema,
    name: pipe(string())
})