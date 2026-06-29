function TaskRender({id, text, completed, onToggle}) {

    return (
        <div>
            <ul>
                {text}
                <input type='checkbox' onChange={() => onToggle(id)}/>{completed ? 'Выполнено' : 'Не выпонено'}
            </ul>
            
        </div>
    )
}

export default TaskRender