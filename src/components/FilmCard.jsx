import React from 'react'; 
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const FilmCard = React.memo(({
    id,
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
    
return (

    <div className='container'>
        <Link to={`/film/${id}`}>
            <img className='poster' src={poster[0]} alt={title} />
            <h1>{title}</h1>
            <div>{date}</div>
            <div>{genre}</div>
        </Link>      

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
)
})

export default FilmCard