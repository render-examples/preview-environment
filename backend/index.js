const express = require('express')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env["DB_CONNECTION_STRING"])

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

const TodoItem = sequelize.define('todos', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

TodoItem.sync()
let cors = require('cors')
const app = express()
app.use(cors())
const port = 3000

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.post('/todos', jsonParser, async (req, res) => {

    try {
        const newTodo = new TodoItem(req.body)
        await newTodo.save()
        res.json({ todo: newTodo })
    } catch(error) {
        console.error(error)
    }
})

app.get('/todos/:todoId', async (req, res) => {
    const todoID = req.params.todoId
    try {
        const todo = await TodoItem.findAll({
                where: {
                    id: todoID
                }
            }
        )
        res.json({ todos: todo })
    } catch(error) {
        console.error(error)
    }
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await TodoItem.findAll({
            order: [
                ['id', 'DESC']
            ]
        })
        res.json({ todos: todos })
    } catch(error) {
        console.error(error)
    }
})

app.get('/', (req, res) => res.json({ message: 'Hello Worlds' }))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
