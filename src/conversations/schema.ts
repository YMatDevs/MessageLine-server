import { strictObject, uuid, array, trim, string, pipe, optional, forward, check, transform } from 'valibot'; 
import { getConversationType } from './utils.js';
import { MIN_CONVERSATION_NAME_LENGTH } from './constants.js';

export const NewConversationSchema = pipe(
    strictObject({
        users: pipe(
            array(pipe(string(), uuid())),
            check(
                (users) => new Set(users).size === users.length,
                "Duplicate user IDs are not allowed"
            )
        ),
        conversation_name: optional(pipe(string(), trim())),
        description: optional(pipe(string(), trim())),
    }),
    transform((input) => ({
        ...input,
        type: getConversationType(input.users),
    })),
    forward(
        check(
            (input) => {
                if (input.type === "GROUP") {
                    return Boolean(
                        input.conversation_name &&
                        input.conversation_name.length >= MIN_CONVERSATION_NAME_LENGTH
                    );
                }
                return true;
            },
            `Group name must be at least ${MIN_CONVERSATION_NAME_LENGTH} non-whitespace characters`
        ),
        ["conversation_name"]
    ),
    transform((input) => {
        if (input.type === "GROUP") {
            return {
                ...input,
                type: input.type,
                conversation_name: input.conversation_name!,
                description: input.description ?? "",
            };
        } else {
            return {
                type: input.type,
                users: input.users,
            };
        }
    })
);
