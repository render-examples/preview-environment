let Todo = require('./todoItem')

const seedValues = [
    "Be excited about Preview Environments!",
    "Align the picture frames of our ancestors",
    "Prepare table in a way that reflects warmth, care, and slight discomfort - a distinctive quality of a family home",
    "Make toast with a balanced mix of delight and sorrow",
]

for (let i = 0; i < seedValues.length; i++) {
    const newTodo = new Todo({"title": seedValues[i]})
    // newTodo.Title = seedValues[i]
    newTodo.save()
}