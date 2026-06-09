import { useState, useEffect, useMemo} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import FilmCard from './components/FilmCard' 
import Reactions from './components/Reactions'
import CountView from './components/CountView'
import FilterFilms from './components/FilterFilms'
import './App.css'

function App() {

const textStyle = {
    color: "violet",
}

// // // Список фильмов
const [films, setFilms] = useState([
    {
        id: 1,
        title: "Олдбой",
        date: "2003",
        genre: "триллер, детектив, драма, криминал",

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
        genre: "триллер, детектив, драма, криминал",

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
        genre: "триллер, детектив, драма, криминал",

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
        genre: "триллер, детектив, драма, криминал",

        like: 131,
        dislike: 25,

        likeFlag: false,
        dislikeFlag: false,

        view: 0
    },
    {
        id: 5,
        title: "Большой куш",
        date: "2000",
        genre: "криминал, комедия, боевик",

        like: 104,
        dislike: 37,

        likeFlag: false,
        dislikeFlag: false,

        view: 0
    },
    {
        id: 6,
        title: "12 обезьян",
        date: "1995",
        genre: "фантастика, триллер, детектив",

        like: 67,
        dislike: 9,

        likeFlag: false,
        dislikeFlag: false,

        view: 0
    },
    {
        id: 7,
        title: "1408",
        date: "2007",
        genre: "ужасы, триллер",

        like: 140,
        dislike: 36,

        likeFlag: false,
        dislikeFlag: false,

        view: 0
    }
])

// // // Поиск
const [search, setSearch] = useState('');
const q = search.trim().toLowerCase();

const matchesSearch = (film) => {
    if (!q) return true;
    const titleSearch = film.title.toLowerCase();
    const genreSearch = film.genre.toLowerCase();
    const dateSearch = film.date.toLowerCase();
    return titleSearch.includes(q) || genreSearch.includes(q) || dateSearch.includes(q);
};

// // // Сортировка
const sortedFilms = [...films].filter(matchesSearch).sort((a, b) => {
    const sumA = a.like + a.dislike;
    const sumB = b.like + b.dislike;

    return sumA - sumB;
});

// // // Списки понравилось/не понравилось
const likedFilms = films.filter(film => film.likeFlag);
const dislikedFilms = films.filter(film => film.dislikeFlag);

// // // Функции лайка/дизлайка
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
                <FilterFilms value={search} onChange={setSearch} />
                {sortedFilms.length === 0 ? (
                    <p>Ничего не найдено</p>
                ) : (
                sortedFilms.map(n => (
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
                    ))    
                 )}
                

                <p>Мне понравилось ({likedFilms.length})</p>
                {likedFilms.map(n => {
                    return (
                            <Reactions
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
                            <Reactions
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