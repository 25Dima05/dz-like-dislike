import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import FilmCard from './components/FilmCard' 
import LikedFilm from './components/LikedFilms'
import DislikedFilm from './components/DislikedFilms'
import './App.css'
import { useEffect } from 'react'

function App() {

function CountView({films}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
            const summView = films.reduce((result, film) => result + film.view, 0);
            setCount(summView);
        }, [films]);
     return (
        <div>
            <p>Просмотрено: {count}</p>
        </div>
     )
}

const textStyle = {
    color: "violet",
}

const [films, setFilms] = useState([
    {
        id: 1,
        title: "Олдбой",
        date: "2003",
        genre: "Триллер, детектив, драма, криминал",

        like: 131,
        dislike: 29,

        likeFlag: false,
        dislikeFlag: false,

        view: 0
    },
    {
        id: 2,
        title: "Таинственная река",
        date: "2003",
        genre: "Триллер, детектив, драма, криминал",

        like: 180,
        dislike: 23,

        likeFlag: false,
        dislikeFlag: false,

        view: 0
    },
    {
        id: 3,
        title: "Пленницы",
        date: "2013",
        genre: "Триллер, детектив, драма, криминал",

        like: 202,
        dislike: 47,

        likeFlag: false,
        dislikeFlag: false,

        view: 0
    },
    {
        id: 4,
        title: "Семь",
        date: "1995",
        genre: "Триллер, детектив, драма, криминал",

        like: 131,
        dislike: 25,

        likeFlag: false,
        dislikeFlag: false,

        view: 0
    }
])

const sortedFilms = [...films].sort((a, b) => {
    const sumA = a.like + a.dislike;
    const sumB = b.like + b.dislike;

    return sumA - sumB;
})

const likedFilms = films.filter(film => film.likeFlag);
const dislikedFilms = films.filter(film => film.dislikeFlag);

function likeMinus(arrFilm) {
    return {
        ...arrFilm,
        like: arrFilm.like - 1,
        likeFlag: false,
    }
}

function dislikeMinus(arrFilm) {
    return {
        ...arrFilm,
        dislike: arrFilm.dislike - 1,
        dislikeFlag: false,
    } 
}

function likePlus(arrFilm) {
    return {
        ...arrFilm,
        like: arrFilm.like + 1,
        likeFlag: true,
        view: arrFilm.view + 1
    }
}

function dislikePlus(arrFilm) {
    return {
        ...arrFilm,
        dislike: arrFilm.dislike + 1,
        dislikeFlag: true,
        view: arrFilm.view + 1
    }
}

function handleLike(filmId) {
    setFilms(prevFilms => 
            prevFilms.map(film => {
                
            if (film.id !== filmId) return film;
            
            if (film.likeFlag) return likeMinus(film);

            else {
                if (film.dislikeFlag) {
                    const updatedFilm = dislikeMinus(film);
                    return likePlus(updatedFilm);
                }
            
                return likePlus(film);
            }
        }) 
    )  
}

function handleDislike(filmId) {
    setFilms(prevFilms => 
        prevFilms.map(film => {
            if (film.id !== filmId) return film;

            if (film.dislikeFlag) return dislikeMinus(film);

            else {
                if (film.likeFlag) {
                    const updatedFilm = likeMinus(film);
                    return dislikePlus(updatedFilm);
                }

                return dislikePlus(film);
            }
        })
    )
}

    return (
        <div>
            <div>
                {sortedFilms.map(n => {
                    return (
                        <FilmCard
                            key={n.id}
                            title={n.title}
                            date={n.date}
                            genre={n.genre}
                            like={n.like}
                            dislike={n.dislike}
                            likeFlag={n.likeFlag}
                            dislikeFlag={n.dislikeFlag}
                            handleLike={() => handleLike(n.id)}
                            handleDislike={() => handleDislike(n.id)}
                        /> 
                    )    
                })}
                

                <p>Мне понравилось ({likedFilms.length})</p>
                {likedFilms.map(n => {
                    return (
                            <LikedFilm
                            key={n.id}
                            title={n.title}
                            date={n.date}
                            genre={n.genre}
                            like={n.like}
                            dislike={n.dislike}
                            likeFlag={n.likeFlag}
                            dislikeFlag={n.dislikeFlag}
                            handleLike={() => handleLike(n.id)}
                            handleDislike={() => handleDislike(n.id)}
                        /> 
                    )    
                })}

                <p>Мне не понравилось ({dislikedFilms.length})</p>
                {dislikedFilms.map(n => {
                    return (
                            <DislikedFilm
                            key={n.id}
                            title={n.title}
                            date={n.date}
                            genre={n.genre}
                            like={n.like}
                            dislike={n.dislike}
                            likeFlag={n.likeFlag}
                            dislikeFlag={n.dislikeFlag}
                            handleLike={() => handleLike(n.id)}
                            handleDislike={() => handleDislike(n.id)}
                        /> 
                    )    
                })}
            </div>
            <div className='countView'>
                <CountView films={films}/>
            </div>
               
        </div>
        
    )
}

export default App