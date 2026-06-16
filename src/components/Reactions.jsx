import classNames from 'classnames';
import '../App.css'

const Reactions = ({
    title,
    poster,
    date,
    genre,
    like,
    dislike,
    likeFlag,
    dislikeFlag,
    handleLike,
    handleDislike
}) => {

// Применение ClassName
const colorClass = classNames(
    "container",
    {
        "green": likeFlag,
        "red": dislikeFlag
    }
);

return (
    <div className={colorClass}>
        <img className='poster' src={poster} alt={title} />
        <h1>{title}</h1>
        <div>{date}</div>
        <div>{genre}</div>

        <div className='containerButtons'>
            <div className='likeDislike'>
                <div>{like}</div>

                <button style={{
                    backgroundColor: likeFlag ? "green" : null
                }} className='actionButton' onClick={handleLike}>Нравится</button>
            </div>
        
            <div className='likeDislike'>
                <div>{dislike}</div>

                <button style={{
                    backgroundColor: dislikeFlag ? "red" : null
                }} className='actionButton' onClick={handleDislike}>Не нравится</button>
            </div>
        </div>
    </div>
)}

export default Reactions