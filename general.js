// 1
// const createUser = require('./dir/file')
// console.log(createUser('vika', 'email'));

//2
// const {var22, createUser, myFunc} = require('./dir/file')
// myFunc();
// console.log(var22);

//3
// require('./dir/file')
// console.log('------------');
// console.log(__filename);
// console.log(__dirname);

//4
// const fs = require('fs');
// const path = require('path')
// const filePath = __dirname + '/dir/dog.txt';
// const filePath2 = __dirname + '/dir/dog2.txt';
// const filePath4 = __dirname + '/movies/home/hello.js';


// console.log(filePath);

// fs.writeFile(filePath, 'Hello world 2021+ 2022', (err) => {
  
//   console.log(err);
// })

// fs.appendFile(filePath3, 'hey man \n', (err) => {
//   if(err) console.log(err);
// })

// fs.readFile(filePath2, (err, data) => {
//   if(err){
//     console.log(err);
//     return
//   } 

//     console.log(data.toString());
// })

// fs.mkdir(`${__dirname}/movies/home`, {recursive: true},(err) => {
//   console.log(err);
//   return
// })

// fs.readdir(`${__dirname}/movies/home`, (err, files) => {
//   if(err){
//     console.log(err);
//     return
//   }
//   files.forEach((file) => {
//     fs.stat(`${__dirname}/movies/home/${file}`, (err, stats) => {
//       if(err){
//         console.log(err);
//         return
//       }
//       console.log(stats);
//     })
//   })
// })

// fs.rmdir(`${__dirname}/some`, {recursive: true},(err) => {
//   if(err) console.log(err);
// })

// fs.unlink(`${__dirname}/dir/dog3.txt`, (error) => {
//   if(err){
//     console.log(err);
//   }
// })

// fs.rename(filePath2, filePath4, (err) => {
//   console.log(err);
// })

// let movie = path.join(__dirname, 'movies');
// console.log(movie);
// let home = path.join(__dirname, 'movies', 'home')
// console.log(home);