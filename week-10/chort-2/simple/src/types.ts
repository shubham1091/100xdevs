export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
};

export type Address = {
    id: number;
    user_id: number;
    city: string;
    country: string;
    street: string;
    pincode: string;
    createdAt: Date;
};
