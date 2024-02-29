// types.ts

export type User = {
    id: number;
    email: string;
    password: string;
};

export type Todo = {
    id: number;
    title: string;
    description?: string;
    user_id: number;
    done: boolean;
};
