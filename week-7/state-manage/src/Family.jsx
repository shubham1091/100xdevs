import axios from "axios";
import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilStateLoadable,
    useRecoilValue,
    useRecoilValueLoadable,
} from "recoil";

const Todos = [
    {
        id: 1,
        title: "Todo 1",
        description: "todo 1 description",
    },
    {
        id: 2,
        title: "Todo 2",
        description: "todo 2 description",
    },
];

// const todosAtomFamily = atomFamily({
//     key: "todosAtomFamily",
//     default: (id) => Todos.find((x) => x.id === id),
// });

const todosAtomFamily = atomFamily({
    key: "todosAtomFamily",
    default: selectorFamily({
        key: "todoAtomFamilySelecter",
        get:
            (id) =>
            async ({ get }) => {
                await new Promise((r) => setTimeout(r, 5000));
                const res = await axios.get(
                    `https://sum-server.100xdevs.com/todo?id=${id}`
                );
                // if (id == 2) {
                //     throw new Error("Invalid");
                // }
                console.log(res.data.todo);
                return res.data.todo;
            },
    }),
});

const TodoAtom = atom({
    key: "TodoAtom",
    default: 1,
});

function Family() {
    return (
        <div>
            <Todo id={1} />
            <Todo id={2} />
            <Todo id={1} />
        </div>
    );
}

export default Family;

function Todo({ id }) {
    const currentTodo = useRecoilValueLoadable(todosAtomFamily(id));
    if (currentTodo.state == "loading") {
        return <p>Loading...</p>;
    } else if (currentTodo.state == "hasValue") {
        return (
            <div
                style={{
                    padding: "2px",
                    margin: "2px",
                    border: "1px solid black",
                    display: "inline-block",
                }}
            >
                {currentTodo.contents.title}
                <br />
                {currentTodo.contents.description}
            </div>
        );
    } else if (currentTodo.state == "hasError") {
        return (
            <div
                style={{
                    padding: "2px",
                    margin: "2px",
                    border: "1px solid black",
                    display: "inline-block",
                }}
            >
                Error loading data
            </div>
        );
    }
}
