const { z } = require("zod");

const createUser = z.object({
    username: z.string().email(),
    password: z.string().min(6).max(100),
    firstName: z.string().max(50),
    lastName: z.string().max(50),
});

const SignInUser = z.object({
    username: z.string().email(),
    password: z.string().min(6).max(100),
});

const UpdateUser = z.object({
    password: z.string().min(6).max(100).optional(),
    firstName: z.string().max(50).optional(),
    lastName: z.string().max(50).optional(),
});

module.exports = {
    createUser,
    SignInUser,
    UpdateUser,
};
