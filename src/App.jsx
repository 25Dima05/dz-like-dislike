import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { taskList } from './data/taskList'
import TaskRender from './components/TaskRender'
import './App.css'

function App() {
    const [tasks, setTask] = useState(taskList);
    const [inputValue, setInputValue] = useState('');

    function addTask(e) {
        e.preventDefault();

        setTask(n => [...tasks,{
            id: uuidv4(), 
            text: inputValue,
            completed: false
        }
        ])

        setInputValue('');
    }

    function toggleCompleted(id) {
        setTask(n => n.map((task) =>
                task.id === id ?
                { ...task, completed: !task.completed } : task
            )      
        )
    }

    return (
        <>
            <div>
                <h1>Список задач</h1>

                {tasks.map(n => (
                    <TaskRender
                    key={n.id} 
                    id={n.id} 
                    text={n.text} 
                    completed={n.completed} 
                    onToggle={toggleCompleted}/>
                ))}

                <form onSubmit={addTask}>
                    <input type='text' value={inputValue} onChange={e => setInputValue(e.target.value)} />
                    <button type='submit'>Добавить задачу</button>
                </form>
            </div>
        </>
    )
}

export default App
