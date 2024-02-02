const myArr = [1,2,3,4,5];
const myArr2 = new Array(1,2,3,4,5);

// Array methods

myArr.push(6); // add element to the end of the array
myArr.pop(); // remove element from the end of the array

console.log(myArr);

myArr.unshift(0); // add element to the beginning of the array
myArr.shift(); // remove element from the beginning of the array

console.log(`Does my aray includes 4 ${myArr.includes(4)} \n`);
console.log(`find the indes of 4 in myArr ${myArr.indexOf(4)}\n`);
console.log(`what is the length of myArr ${myArr.length}\n`)

const nwArr = myArr.join()
console.log(`whaht happens when i use join method => ${nwArr} and the type of it is ${typeof nwArr}\n `)

// slice, splice

console.log(`Original array: ${nwArr}\n`);
const myn1 = myArr.slice(1,3);

console.log(`myn1: myArr.slice(1,3) => ${myn1}\n`);
console.log(`myArr after slice: ${myn1}\n`);

const myn2 = myArr.splice(1,3);
console.log(`myn2: myArr.splice(1,3) => ${myn2}\n`);
console.log(`myArr after splice: ${myn2}\n`);