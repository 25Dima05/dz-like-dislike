import { useState, useEffect, useMemo} from 'react'
import { v4 as uuidv4 } from 'uuid';
import FilmCard from './components/FilmCard' 
import Reactions from './components/Reactions'
import CountView from './components/CountView'
import FilterFilms from './components/FilterFilms'
import classNames from 'classnames';
import oldboyPoster from './assets/oldboyPoster.jpg';
import monkeys from './assets/12Monkeys.jpg';
import snatch from './assets/snatch.jpg';
import seven from './assets/seven.jpg';
import fourteenOhEight from './assets/1408.jpg';
import mysticRiver from './assets/mysticRiver.jpg';
import prisoners from './assets/prisoners.jpg';
prisoners
import './App.css'

function App() {

const textStyle = {
    color: "violet"
}

// // // Список фильмов
const [films, setFilms] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const timerId = setTimeout(() => {
        const timerFilms = [
            {
                id: uuidv4(),
                title: "Олдбой",
                poster: oldboyPoster,
                date: "2003",
                genre: "триллер, детектив, драма, криминал",

                like: 131,
                dislike: 29,

                likeFlag: false,
                dislikeFlag: false,

                view: 0
            },
            {
                id: uuidv4(),
                title: "Таинственная река",
                poster: mysticRiver,
                date: "2003",
                genre: "триллер, детектив, драма, криминал",

                like: 180,
                dislike: 23,

                likeFlag: false,
                dislikeFlag: false,

                view: 0
            },
            {
                id: uuidv4(),
                title: "Пленницы",
                poster: prisoners,
                date: "2013",
                genre: "триллер, детектив, драма, криминал",

                like: 202,
                dislike: 47,

                likeFlag: false,
                dislikeFlag: false,

                view: 0
            },
            {
                id: uuidv4(),
                title: "Семь",
                poster: seven,
                date: "1995",
                genre: "триллер, детектив, драма, криминал",

                like: 131,
                dislike: 25,

                likeFlag: false,
                dislikeFlag: false,

                view: 0
            },
            {
                id: uuidv4(),
                title: "Большой куш",
                poster: snatch,
                date: "2000",
                genre: "криминал, комедия, боевик",

                like: 104,
                dislike: 37,

                likeFlag: false,
                dislikeFlag: false,

                view: 0
            },
            {
                id: uuidv4(),
                title: "12 обезьян",
                poster: monkeys,
                date: "1995",
                genre: "фантастика, триллер, детектив",

                like: 67,
                dislike: 9,

                likeFlag: false,
                dislikeFlag: false,

                view: 0
            },
            {
                id: uuidv4(),
                title: "1408",
                poster: fourteenOhEight,
                date: "2007",
                genre: "ужасы, триллер",

                like: 140,
                dislike: 36,

                likeFlag: false,
                dislikeFlag: false,

                view: 0
            }
        ]

        setFilms(timerFilms);
        setLoading(false);
        }, 1500);

        return () => clearTimeout(timerId);
}, []);

// // // Поиск
const [title, setTitle] = useState('');
const [yearFrom, setYearFrom] = useState('');
const [yearTo, setYearTo] = useState('');
const [genreFilter, setGenreFilter] = useState('');

const [filteredFilms, setFilteredFilms] = useState([]);

useEffect(() => {
    let result = [...films];

    if (title.trim()) {
    const q = title.trim().toLowerCase();
    result = result.filter(f => f.title.toLowerCase().includes(q));
    }

    if (yearFrom.trim()) {
        const year = Number(yearFrom);
        if (!Number.isNaN(year)) {
            result = result.filter(f => Number(f.date) >= year);
        }
    }

    if (yearTo.trim()) {
        const toYear = Number(yearTo);
        if (!Number.isNaN(toYear)) {
        result = result.filter(f => Number(f.date) <= toYear);
        }
    }

    if (genreFilter) {
        const g = genreFilter.toLowerCase();
        result = result.filter(f => f.genre.toLowerCase().includes(g));
    }

// // // Сортировка
    result.sort((a, b) => {
        const sumA = a.like + a.dislike;
        const sumB = b.like + b.dislike;

        return sumA - sumB;
    });

    setFilteredFilms(result);
}, [films, title, yearFrom, yearTo, genreFilter]);

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
                <FilterFilms
                    title={title}
                    yearFrom={yearFrom}
                    yearTo={yearTo}
                    genreFilter={genreFilter}
                    searchTitle={setTitle}
                    searchYearFrom={setYearFrom}
                    searchYearTo={setYearTo}
                    searchGenre={setGenreFilter}
                />

                {filteredFilms.length === 0 ? (
                    <p>Ничего не найдено</p>
                ) : (
                filteredFilms.map(n => (
                        <FilmCard
                            key={n.id}
                            title={n.title}
                            poster={n.poster}
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
                            poster={n.poster}
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
                            poster={n.poster}
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