import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { taskList } from './data/taskList';
import TaskRender from './components/TaskRender';
import './App.css'


function App() {
    const [task, setTask] = useState(taskList);

    const [inputHeader, setInputHeader] = useState('');
    const [inputText, setInputText] = useState('');

    function addTask(e) {
        e.preventDefault();

        setTask([...task,{
            id: uuidv4(),
            header: inputHeader,
            text: inputText,
            important: false
        }])

        setInputHeader('');
        setInputText('');
    }
    
    function toggleImportant(id) {
        setTask(n => n.map(task =>
            task.id === id ?
            {...task, important: !task.important } : task
        ))
    }

    function deleteTask(id) {
        setTask(n => n.filter(task => 
            task.id !== id 
        ))
    }

    function filteredTask() {
        setTask(n => n.filter(task =>
            task.important
        ))
    }

    return (
        <>
            <div>
                <h1>
                    Notes Manager
                </h1>

                {task.map(n => (
                    <TaskRender 
                        key={n.id}
                        id={n.id}
                        header={n.header}
                        text={n.text}
                        important={n.important}
                        onToggle={toggleImportant}
                        onDelete={deleteTask}
                    />
                ))}

                <form onSubmit={addTask}>
                    <div>
                        <div>Заголовок</div>
                        <input type='text' value={inputHeader} onChange={e => setInputHeader(e.target.value)}/>

                        <div>Текст</div>
                        <input type='text' value={inputText} onChange={e => setInputText(e.target.value)}/>
                    </div>
                    

                    <button type='submit'>Добавить задачу</button>
                </form>

                <button onClick={() => filteredTask()}>Фильтровать</button>
            </div>
        </>
    )
}

export default App