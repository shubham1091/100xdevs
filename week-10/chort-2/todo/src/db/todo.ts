import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
    userId: number,
    title: string,
    description: string
) {
    const todo = await prisma.todo.create({
        data: {
            title: title,
            description: description,
            userId: userId,
        },
    });

    return {
        title: todo.title,
        description: todo.description,
        done: todo.done,
        id: todo.id,
    };
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    const todo = await prisma.todo.update({
        where: {
            id: todoId,
        },
        data: {
            done: true,
        },
    });

    return {
        title: todo.title,
        description: todo.description,
        done: todo.done,
        id: todo.id,
    };
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    const todos = await prisma.todo.findMany({
        where: {
            userId: userId,
        },
    });

    const list = todos.map((todo) => ({
        title: todo.title,
        description: todo.description,
        done: todo.done,
        id: todo.id,
    }));

    console.log(todos)

    return todos;
}
