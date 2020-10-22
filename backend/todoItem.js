const Sequelize = require('sequelize')
const sequelize = new Sequelize("postgres://test_user:c4pPdkgrndsI9MpdgGtaSjGbJGJFryeT@oregon-postgres.render.com/test_db_47yf")

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