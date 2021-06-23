
// Посортувати юзерів по папках.
// У вас є дві папки. 1800 та 2000. В кожній з цих папок є файлики аля Karina.txt в якому міститься {"gender": "female"}
// Oleg.txt в якому міститься {"gender": "male"}
// 1) Студентів з 1800 перевести в групу на 2000. І навпаки
// 2) Перемістити всіх дівчат в папку girls а хлопців в папаку boys.

const fs = require('fs');
const path = require('path');

const path1800 = path.join(__dirname, 'users', '1800');
const path2000 = path.join(__dirname, 'users', '2000');
const pathMan = path.join(__dirname, 'users', 'man');
const pathWomen = path.join(__dirname, 'users', 'women');

const redirectFile = (firstPath, secondPath) => {
  fs.readdir(firstPath, (err, files) => {
    for (const file of files) {
      fs.rename(path.join(firstPath, file), path.join(secondPath, file), (err) => { 
        if(err) {
          console.log(err)
          return
        }
      });
    }
  })
}

redirectFile(path2000, path1800);
redirectFile(path1800, path2000);

fs.readdir(path2000, (err, files) => {
  if(err){
    console.log(err)
    return
  }
  files.forEach(file => {
    fs.readFile(path.join(__dirname, 'users', '2000', file), (err, data)=> {
      if(err){
        console.log(err)
        return
      }
      const person = JSON.parse(data)

      if(person.gender === 'male') {
        fs.rename(path.join(path2000, file), path.join(pathMan, file), err => {
          if(err){
            console.log(err)
            return
          }
        })
      } else if (person.gender === 'female') {
        fs.rename(path.join(path2000, file), path.join(pathWomen, file), err => {
          if(err){
            console.log(err)
            return
          }
        })
      }

    })
  })
})

fs.readdir(path1800, (err, files) => {
  if(err){ 
    console.log(err)
    return
  }

  files.forEach(file => {
    fs.readFile(path.join(__dirname, 'users', '1800', file), (err, data) => {
      const person = JSON.parse(data)
      if(person.gender === 'male') {
        fs.rename(path.join(path1800, file), path.join(pathMan, file), (err)=> {
          if(err) {
            console.log(err)
            return
          }
        })
      } else if (person.gender === 'female') {
        fs.rename(path.join(path1800, file), path.join(pathWomen, file), (err)=> {
          if(err) {
            console.log(err)
            return
          }
        })
      }
    })
  })
})

// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// і розподілити ваших юзерів саме по відповідних папках

const users = [
  { name: 'ira', gender: 'female', age: 19 },
  { name: 'olya', gender: 'female', age: 79 },
  { name: 'andrew', gender: 'male', age: 10 },
  { name: 'oleg', gender: 'male', age: 15 },
  { name: 'vasuluna', gender: 'female', age: 63 },
  { name: 'vika', gender: 'female', age: 54 },
  { name: 'markian', gender: 'male', age: 35 },
  { name: 'roksolana', gender: 'female', age: 21 },
  { name: 'igor', gender: 'male', age: 29 },
  { name: 'vasul', gender: 'male', age: 29 },
]
const fs = require('fs');
const path = require('path');


users.forEach((user) => {
  if(user.age < 20 && user.gender === 'male'){
    fs.appendFile(path.join(__dirname, 'users', 'manYounger20', `${user.name}.txt`), `${JSON.stringify(user)}`, (err)=> {
    if(err){
      console.log(err)
      return;
    }
  })
  } else if (user.age > 20 && user.gender === 'male') {
    fs.appendFile(path.join(__dirname, 'users', 'manOlder20', `${user.name}.txt`), `${JSON.stringify(user)}`, (err)=> {
    if(err){
      console.log(err)
      return;
    }
  })
  } else if ( user.age < 20 && user.gender === 'female'){

  fs.appendFile(path.join(__dirname, 'users', 'womanYounger20',`${user.name}.txt`), `${JSON.stringify(user)}`, (err)=> {
    if(err){
      console.log(err)
      return;
    }
  })
  } else if (user.age > 20 && user.gender === 'female'){

  fs.appendFile(path.join(__dirname, 'users', 'womanOlder20',`${user.name}.txt`), `${JSON.stringify(user)}`, (err)=> {
    if(err){
      console.log(err)
      return;
    }
  })
  }
})