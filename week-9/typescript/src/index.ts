const x: number = 1;
console.log(x);

function great(firstName: string) {
    console.log(`Hello ${firstName}`);
}

const sum = (a: number, b: number) => {
    return a + b;
};

function isLeagel(age: number) {
    return age >= 18;
}

// function runAfter(fn: Function) {
//     setTimeout(fn, 10000)
// }
function runAfter(fn: () => void) {
    setTimeout(fn, 10000);
}

export interface User {
    age: number;
    firstName: string;
    lastName: string;
    email?: string // optional
}

function leagelUser(user: User) {
    return user.age >= 18;
}

sum(1, 2);
great("John");

// great(1);

runAfter(() => {
    console.log("hello world");
});
