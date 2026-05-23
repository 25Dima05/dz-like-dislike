import '../App.css'

const LikedCard = ({
    title,
    date,
    genre,
    like,
    dislike,
    likeColor,
    dislikeColor,
    handleLike,
    handleDislike
}) => {

return (
    <div className={likeColor}>
        <h1 style={{color: "violet"}}>{title}</h1>
            <p style={{color: "violet"}}>{date}</p>
            <p style={{color: "violet"}}>{genre}</p>
            <p>{like}</p>
            <p>{dislike}</p>

            <button style={{
                backgroundColor: likeColor
            }} className='actionButton' onClick={handleLike}>Нравится</button>

            <button style={{
                backgroundColor: dislikeColor
            }} className='actionButton' onClick={handleDislike}>Не нравится</button>
    </div>
)}

export default LikedCard