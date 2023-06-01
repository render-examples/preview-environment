import React, {useEffect, useState} from 'react';

import LogoIcon from "./images/logo-icon.svg";
import CheckIcon from "./images/group_4949.svg";

import './App.css';

const baseUrl = 'https://' + process.env.REACT_APP_API_HOST + '.onrender.com'

const ListItem = ({ title }) => {
  return (
      <div className="task-row"><img src={CheckIcon} alt="" className="task-check-icon"/>
        <h3 className="task-text">{title}</h3>
      </div>
  )
}

const TodoList = ({items}) => {
   return (
       <div>
           {items.map((item) => (
               <ListItem title={item.title}/>
           ))}
       </div>
   )
}
function FetchData() {
    return fetch(baseUrl + '/todos')
        .then(items => items.json())
}

function App() {
    const [todos, setTodos] = useState([] );

    function CheckKey(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            SubmitTodo()
        }
    }
    function SubmitTodo() {
        let element = document.getElementById('name-5')
        const { value } = element
        if (value === '') {
            return
        }
        element.value = ''
        fetch(baseUrl+ '/todos', {method: "POST", body: JSON.stringify({title: value}), headers: {'Content-Type': 'application/json'}} )
        setTodos([{title: value}].concat(todos))
    }

    useEffect(() => {
        async function loadTodos() {
            const result = await FetchData()
            setTodos(result.todos)
        }
        loadTodos()
    }, []);
  return (
      <div className="banner-container">
        <div className="widget-container-2 outline">
          <div className="widget-body-2">
            <div className="w-form">
              <form id="email-form" name="email-form" data-name="Email Form" className="form">
                <div className="task-title-group"><img src={LogoIcon} loading="lazy" alt="" className="task-logo"/>
                  <div className="task-overline">Powered by <a href="https://render.com">Render</a></div>
                  <h1 className="task-title">Todo List</h1>
                </div>
                <div className="task-container">
                  <div className="task-wrapper">
                      <input type="text" className="task-input w-input" onKeyPress={CheckKey} maxLength="256" name="name-5" data-name="Name 5" placeholder="enter a task description ..." id="name-5"/>
                  </div>
                  <a className="task-button w-inline-block" onClick={SubmitTodo}>
                    <div>Add Task</div>
                  </a>
                </div>
                <TodoList items={todos}/>
              </form>
              <div className="w-form-done">
                <div>GOT IT! Your submission has been received!</div>
              </div>
              <div className="w-form-fail">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default App;
