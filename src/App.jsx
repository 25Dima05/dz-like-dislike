import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import FilmCard from './components/FilmCard' 
import LikedFilm from './components/LikedFilms'
import DislikedFilm from './components/DislikedFilms'
import './App.css'

function App() {

const textStyle = {
    color: "violet",
}

const [films, setFilms] = useState([
    {
        id: 1,
        title: "Олдбой",
        year: "2003",
        genre: "Триллер, детектив, драма, криминал",

        like: 131,
        dislike: 29,

        likeFlag: false,
        dislikeFlag: false
    },
    {
        id: 2,
        title: "Таинственная река",
        year: "2003",
        genre: "Триллер, детектив, драма, криминал",

        like: 180,
        dislike: 23,

        likeFlag: false,
        dislikeFlag: false
    },
    {
        id: 3,
        title: "Пленницы",
        year: "2013",
        genre: "Триллер, детектив, драма, криминал",

        like: 202,
        dislike: 47,

        likeFlag: false,
        dislikeFlag: false
    },
    {
        id: 4,
        title: "Семь",
        year: "1995",
        genre: "Триллер, детектив, драма, криминал",

        like: 131,
        dislike: 25,

        likeFlag: false,
        dislikeFlag: false
    }
])

const sortedFilms = [...films].sort((a, b) => {
    const sumA = a.like + a.dislike;
    const sumB = b.like + b.dislike;

    return sumA - sumB;
})

const likedFilms = films.filter(film => film.likeFlag === true)
const dislikedFilms = films.filter(film => film.dislikeFlag === true)

function likeMinus(arrFilm) {
    return {
        ...arrFilm,
        like: arrFilm.like - 1,
        likeFlag: false
    }
}

function dislikeMinus(arrFilm) {
    return {
        ...arrFilm,
        dislike: arrFilm.dislike - 1,
        dislikeFlag: false
    } 
}

function likePlus(arrFilm) {
    return {
        ...arrFilm,
        like: arrFilm.like + 1,
        likeFlag: true
    }
}

function dislikePlus(arrFilm) {
    return {
        ...arrFilm,
        dislike: arrFilm.dislike + 1,
        dislikeFlag: true
    }
}

function handleLike(filmId) {
    setFilms(prevFilms => 
            prevFilms.map(film => {
                
            if (film.id !== filmId) return film
            
            if (film.likeFlag) return likeMinus(film)

            else {
                if (film.dislikeFlag) {
                    const updatedFilm = dislikeMinus(film);
                    return likePlus(updatedFilm);
                }
            
                return likePlus(film)
            }
        }) 
    )  
}

function handleDislike(filmId) {
    setFilms(prevFilms => 
        prevFilms.map(film => {
            if (film.id !== filmId) return film

            if (film.dislikeFlag) return dislikeMinus(film)

            else {
                if (film.likeFlag) {
                    const updatedFilm = likeMinus(film);
                    return dislikePlus(updatedFilm);
                }

                return dislikePlus(film)
            }
        })
    )
}

    return (
        <div>
            <div>
                {sortedFilms.map(n => {
                    const likeColor = n.likeFlag && !n.dislikeFlag ? "green" : null 
                        //не могу убрать n.likeFlag или !n.dislikeFlag , цвет кнопок ломается 
                    const dislikeColor = n.dislikeFlag && !n.likeFlag ? "red" : null

                    return (
                        <FilmCard
                            key={n.id}
                            title={n.title}
                            date={n.date}
                            genre={n.genre}
                            like={n.like}
                            dislike={n.dislike}
                            likeColor={likeColor}
                            dislikeColor={dislikeColor}
                            handleLike={() => handleLike(n.id)}
                            handleDislike={() => handleDislike(n.id)}
                        /> 
                    )    
                })}

                <p>Мне понравилось ({likedFilms.length})</p>
                {likedFilms.map(n => {
                    const likeColor = n.likeFlag && !n.dislikeFlag ? "green" : null 
                        //не могу убрать n.likeFlag или !n.dislikeFlag , цвет кнопок ломается 
                    const dislikeColor = n.dislikeFlag && !n.likeFlag ? "red" : null

                    return (
                            <LikedFilm
                            key={n.id}
                            title={n.title}
                            date={n.date}
                            genre={n.genre}
                            like={n.like}
                            dislike={n.dislike}
                            likeColor={likeColor}
                            dislikeColor={dislikeColor}
                            handleLike={() => handleLike(n.id)}
                            handleDislike={() => handleDislike(n.id)}
                        /> 
                    )    
                })}

                <p>Мне не понравилось ({dislikedFilms.length})</p>
                {dislikedFilms.map(n => {
                    const likeColor = n.likeFlag && !n.dislikeFlag ? "green" : null 
                        //не могу убрать n.likeFlag или !n.dislikeFlag , цвет кнопок ломается 
                    const dislikeColor = n.dislikeFlag && !n.likeFlag ? "red" : null

                    return (
                            <DislikedFilm
                            key={n.id}
                            title={n.title}
                            date={n.date}
                            genre={n.genre}
                            like={n.like}
                            dislike={n.dislike}
                            likeColor={likeColor}
                            dislikeColor={dislikeColor}
                            handleLike={() => handleLike(n.id)}
                            handleDislike={() => handleDislike(n.id)}
                        /> 
                    )    
                })}
            </div>
        </div>
    )
}

export default App