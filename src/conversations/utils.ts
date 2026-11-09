import { MAX_MEMBERS_IN_DIRECT_CONVERSATION } from "./constants.js";
import type { ConversationType } from "./types.js";

export function getConversationType(user_list: string[]): ConversationType {
    if( MAX_MEMBERS_IN_DIRECT_CONVERSATION < user_list.length + 1) return "GROUP";
    else return "DIRECT";
}