const express = require('express')
const expressHbs = require('express-handlebars')
const path = require('path')
const fs = require('fs');
const app = express();

const fsPromises = require('fs/promises')

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'static'))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const usersPath = path.join(__dirname, 'static', 'users.txt')
let error = ''
const users = []

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', async (req, res) => {
    let {name, email, password} = req.body

    let users = await fsPromises.readFile(usersPath, 'utf8');
    users = JSON.parse(users);

    const emailCreated = users.find(user => user.email === email)

    if(!name || !email || !password){
        error = 'fill all form'
        res.render('error', {error})
        return
    }

    if(emailCreated){
        error = 'this email already created'
        res.render('error', {error})
        return
    }

    const id = users.length + 1;

    users.push({id, name, email, password});

    await fsPromises.writeFile(usersPath, JSON.stringify(users));

    res.redirect(`/`)
})


app.listen(3000, () =>{
    console.log('local host 3000')
})


//app.get('/users', (req, res) => {
//     res.render('users')
// })
//
// app.get('/login', (req, res) => {
//     res.render('login');
// });
// app.post('/login', (req, res) => {
//
//     console.log(req.body)
//     // users.find()
//     res.json('okay')
// })
