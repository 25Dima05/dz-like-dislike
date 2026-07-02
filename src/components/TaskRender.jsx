import classNames from 'classnames'
import '../App.css'

function TaskRender({ id, header, text, important, onToggle, onDelete }) {
    const colorImportant = classNames('card', {
        'important': important ? true : false
    })

    return (
        <>
            <div className={colorImportant}>
                <h2>{header}</h2>
                - {text}
                
                <input type="checkbox" onChange={() => onToggle(id)}/>{important ? 'Важно' : 'Не важно'}
                <button onClick={() => onDelete(id)}>Удалить</button>
            </div>
        </>
    )
}

export default TaskRender