import { User } from ".";

export enum Direction {
    Up,
    Down,
    Left,
    Right,
}

function doSomething(keyPressed: Direction) {
    if (keyPressed == Direction.Up) {
        console.log("Up");
    }
}

doSomething(Direction.Up);

console.log(Direction.Down);

function identity<T>(arg: T[]) {
    return arg[0];
}

let op = identity(["val"]);
let po = identity([1]);

let us = identity<User>([{ age: 21, firstName: "shubham", lastName: "verma" }]);
