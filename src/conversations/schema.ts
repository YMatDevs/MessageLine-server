import { strictObject, uuid, array, string, pipe, optional, forward, check, transform } from 'valibot'; 
import { getConversationType } from './utils.js';
import { MIN_CONVERSATION_NAME_LENGTH } from './constants.js';

export const NewConversationSchema = pipe(strictObject({
        users: array(pipe(string(), uuid())),
        conversation_name: optional(string()),
        description: optional(string()),
    }),
    transform((input) => ({
        ...input,
        type: getConversationType(input.users),
    })),
    forward(
        check(
            (input) => {

                
                if(input.type === "GROUP"){
                    if( input.conversation_name 
                        && input.conversation_name.length >= MIN_CONVERSATION_NAME_LENGTH ) return true;
                    else return false;
                } else return true;
                
            }
        ),
        ["conversation_name"]
    ),
    transform((input) => {
        if(input.type === "GROUP") return {
            ...input,
            conversation_name: input.conversation_name!,
            description: input.description ?? "",
        }
        else return {
            type: input.type,
            users: input.users,
        }
    }),
    

)
