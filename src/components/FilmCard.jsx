import '../App.css'

const FilmCard = ({
    title,
    date,
    genre,
    like,
    dislike,
    likeFlag,
    dislikeFlag,
    handleLike,
    handleDislike
}) => {

return (
    <div className='container'>
        <h1>{title}</h1>
            <p>{date}</p>
            <p>{genre}</p>
            <p>{like}</p>
            <p>{dislike}</p>

            <button style={{
                backgroundColor: likeFlag ? "green" : null
            }} className='actionButton' onClick={handleLike}>Нравится</button>

            <button style={{
                backgroundColor: dislikeFlag ? "red" : null
            }} className='actionButton' onClick={handleDislike}>Не нравится</button>
    </div>
    
)}

export default FilmCard