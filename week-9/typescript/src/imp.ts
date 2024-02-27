import { User } from ".";

interface Person {
    name: string;
    age?: number;
    greet(phrase: string): void;
}

type customer = {
    firstName: string;
    lastName: string;
    age: number;
};

class Employee implements Person {
    name: string;
    age?: number;

    constructor(name: string, age?: number) {
        this.name = name;
        this.age = age;
    }
    greet(phrase: string): void {
        console.log(`${phrase} ${this.name}`);
    } 
}

class Manager extends Employee {
    exp: number;
    constructor(name: string, exp: number, age?: number) {
        super(name, age);
        this.exp = exp;
    }

    detail() {
        console.log(`name: ${this.name}, has ${this.exp} years of experience`);
    }
}

const shubham = new Employee("shubham", 12);
const harkirat = new Manager("harkirat", 10);

shubham.greet("Hello from");

harkirat.greet("Hello from");
harkirat.detail();

type GreetArg = number | string | boolean;

function greet(arg: GreetArg) {
    console.log(arg);
}

greet(12);
greet("hello");

type p1 = {
    name: string;
    startDate: Date;
};

type p2 = {
    name: string;
    department: string;
};

type TechLead = p1 & p2;
type intern = p1 | p2;

const t: TechLead = {
    department: "sys admin",
    name: "aayus",
    startDate: new Date(),
};

const i: intern = {
    // department: "",
    name: "the ml guy",
    startDate: new Date(),
};

// given a list of users filter out the users tht are leagal (over 18)


function voters(usr: User[]) {
    return usr.filter((user: User) => user.age >= 18);
}

const ls: User[] = [
    { firstName: "John", lastName: "doe", age: 1 },
    { firstName: "shubham", lastName: "verma", age: 21 },
    { firstName: "ana", lastName: "grasia", age: 22 },
];

const ul = voters(ls);

console.log(ul);


