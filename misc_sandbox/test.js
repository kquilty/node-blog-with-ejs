

const sayHello = (name) => {
  console.log(`Hello, ${name}!`);
}

const fs = require('fs');
// sayHello('Timmy');

// console.log(__dirname);
// console.log(__filename);

const { age_array } = require('./people');
console.log(age_array);    
// console.log(people_array);    

const os = require('os');
console.log(os.platform(), os.homedir());


const writeStream = fs.createReadStream('./test_input.txt');
writeStream.on('data', (chunk) => {
    console.log("\n-------- NEW CHUNK \n");
    console.log(chunk.toString());
})