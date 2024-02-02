const marvel_heros = ["thor", "Iron man", "spiderman"];
const dc_heros = ["superman", "flash", "batman"];

/* 
marvel_heros.push(dc_heros)
console.log(marvel_heros)) 
*/

// const allHeros = marvel_heros.concat(dc_heros);
const allHeros = [...marvel_heros, ...dc_heros]; // same as concat but better we can add multiple
console.log(allHeros);

const another_arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11]]];
const real_another_arr = another_arr.flat(Infinity);
console.log(real_another_arr);


console.log(Array.isArray("shubham"))
console.log(Array.from("shubham"));