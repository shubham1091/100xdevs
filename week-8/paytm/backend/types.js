const { z } = require("zod");

const createUser = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
});

const SignInUser = z.object({
    username: z.string().email(),
    password: z.string(),
});

const UpdateUser = z.object({
    password: z.string().optional(),
    filter: z.string().optional(),
    lastName: z.string().optional(),
});

module.exports = {
    createUser,
    SignInUser,
    UpdateUser,
};
