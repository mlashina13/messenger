import Block from './core/Block';
import { WebSocketTransport } from './core/wsTransport';

export type TAppState = {
    error: string | null,
    user: TUser | null,
    isOpenChangePassword: boolean,
    isOpenLoadPhoto: boolean,
    isOpenDialogChat: boolean,
    isOpenDialogAddUser: boolean,
    chats: TChat[],
    messages: object[],
    socket: WebSocketTransport | null,
    blockMessage: boolean,
    activeChat: number | null;
}

export type TOptions = {
    method: string,
    timeout?: number;
    headers?: string[];
    data?: Object;
};

export type TAddUsers = {
    users: string[];
    chatId: number;
}

export type TUser = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
    password?: string
}

export type TUserProfile = {
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    email: string;
}

type TLastMessage = {
    user: TUser,
    time: string,
    content: string
}

export type TMessage = {
    content: string,
    id: number,
    time: string,
    type: string,
    user_id: number
}

export type TChat = {
    id: number,
    title: string,
    avatar: Nullable<string>,
    unreadCount: number,
    last_message: TLastMessage | null,
    active?: boolean
}

export type RefType = {
    [key: string]: Element | Block<object>
}
