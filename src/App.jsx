import { useState, useEffect} from 'react'
import { useSearchParams, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom'
import { filmsData } from './components/FilmsData';
import FilmCard from './components/FilmCard' 
import Reactions from './components/Reactions'
import CountView from './components/CountView'
import FilterFilms from './components/FilterFilms'
import './App.css'

function App() {

const textStyle = {
    color: "violet"
}

const [searchParams, setSearchParams] = useSearchParams();
const navigate = useNavigate();

const title = searchParams.get('search') || '';
const yearFrom = searchParams.get('date_from') || '';
const yearTo = searchParams.get('date_to') || '';
const genreFilter = searchParams.get('genre') || '';

const setQueryParam = (key, value) => {
const newParams = new URLSearchParams(searchParams.toString());
    if (!value || value === '') {
        newParams.delete(key);

    } else {
        newParams.set(key, value);
    }

    navigate(`?${newParams.toString()}`, { replace: true });
};

// // // Список фильмов
const [films, setFilms] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => {
        setFilms(filmsData);
        setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
}, []);

// // // Поиск
let filteredFilms = [...films];

    if (title.trim()) {
        const q = title.trim().toLowerCase();
        filteredFilms = filteredFilms.filter((f) =>
            f.title.toLowerCase().includes(q)
        )
    }

    if (yearFrom.trim()) {
        const year = Number(yearFrom);
        if (!Number.isNaN(year)) {
            filteredFilms = filteredFilms.filter((f) => Number(f.date) >= year);
        }
    }

    if (yearTo.trim()) {
        const toYear = Number(yearTo);
        if (!Number.isNaN(toYear)) {
            filteredFilms = filteredFilms.filter((f) => Number(f.date) <= toYear);
        }
    }

    if (genreFilter) {
        const g = genreFilter.toLowerCase();
        filteredFilms = filteredFilms.filter((f) =>
            f.genre.toLowerCase().includes(g)
        );
    }

// // // Сортировка
    filteredFilms.sort((a, b) => {
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
                <FilterFilms
                    title={title}
                    yearFrom={yearFrom}
                    yearTo={yearTo}
                    genreFilter={genreFilter}
                    searchTitle={(value) => setQueryParam('search', value)}
                    searchYearFrom={(value) => setQueryParam('date_from', value)}
                    searchYearTo={(value) => setQueryParam('date_to', value)}
                    searchGenre={(value) => setQueryParam('genre', value)}
                />

                {filteredFilms.length === 0 ? (
                    <p>Ничего не найдено</p>
                ) : (
                filteredFilms.map(n => (
                        <FilmCard
                            key={n.id}
                            id={n.id}
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