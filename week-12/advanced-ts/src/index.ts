interface User {
    name: string; // Name of the user
    age: number; // Age of the user
}

// Function to calculate the sum of ages of two users
function sumOfAge(user1: User, user2: User) {
    return user1.age + user2.age;
}

const age = sumOfAge({ name: "John", age: 30 }, { name: "tony", age: 20 });

console.log(age);

// Interface for an account with various properties
interface Account {
    id: string; // Unique identifier for the account
    name: string; // Name of the account holder
    age: number; // Age of the account holder
    email: string; // Email address of the account holder
    password: string; // Password for the account
}

// Type defining properties that can be updated for an account
type UpdateProps = Pick<Account, "name" | "email" | "password" | "age">;

// Function to update an account with specified properties
function updateUser(props: UpdateProps) {}

updateUser({ name: "value", email: "value", password: "value", age: 32 });

// Type defining optional properties that can be updated for an account
type UpdatePropsOptional = Partial<Account>;

// Function to update an account with optional properties
function updateUserOptional(props: UpdatePropsOptional) {}

updateUserOptional({ name: "something new" });

// Type defining a readonly user
type Use = {
    readonly name: string; // Readonly name of the user
    readonly age: number; // Readonly age of the user
};

const user: Use = {
    name: "John",
    age: 30,
};
// user.name = "sam"; // Error: Cannot assign to 'name' because it is a read-only property

// Readonly interface for a user
const rdo: Readonly<User> = {
    name: "John",
    age: 30,
};

// Type defining a record with string keys and string values
type Rec = Record<string, string>;

const rec: Rec = {
    name: "John",
    age: "30",
};

// Type defining possible event types
type EventType = "click" | "scroll" | "mousemove";

// Type excluding a specific event type
type ExcludeEvent = Exclude<EventType, "scroll">;
