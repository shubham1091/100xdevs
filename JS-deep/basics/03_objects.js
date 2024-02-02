//singleton =  Object.create

const mySym = Symbol("key");
// object literals

const JsUser = {
    name: "shubham",
    age: 25,
    email: "shubham@gmail.com",
    isLoggedIn: true,
    lastLoginDays: ["Monday", "Saturday"],
    "full name": "shubham verma",
    [mySym]: "somthing",
    greetig: function () {
        console.log("Hello");
    },
};

console.log(JsUser.email);
console.log(JsUser["email"]);
// console.log(JsUser."full name"); // not going to work
console.log(JsUser["full name"]);
console.log(JsUser[mySym]);
JsUser.greetig();
delete JsUser.lastLoginDays; // deletes a property of object

/* 
Object.seal(JsUser)

JsUser.age = 21;
JsUser.location = "Rajasthan" // not going to work 
*/

Object.freeze(JsUser); // now we can not edit this object anymore

JsUser.age = 25;


let { age : userAge} = JsUser;
console.log(userAge);
