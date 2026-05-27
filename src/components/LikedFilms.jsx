import '../App.css'

const LikedCard = ({
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
    <div className={likeFlag ? "green" : null}>
        <h1 style={{color: "violet"}}>{title}</h1>
            <p style={{color: "violet"}}>{date}</p>
            <p style={{color: "violet"}}>{genre}</p>
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

export default LikedCard