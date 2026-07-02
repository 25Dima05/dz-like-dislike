import { useState, useEffect, useReducer, useContext, useMemo, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { filmsData } from './data/data';
import { filmReducer } from './reducers/reducer';
import { ThemeContext } from './components/ThemeProvider';
import FilmCard from './components/FilmCard' 
import Reactions from './components/Reactions'
import CountView from './components/CountView'
import FilterFilms from './components/FilterFilms'
import ThemeChange from './components/ThemeChange';
import './App.css'

function App() {

const textStyle = {
    color: "violet"
}

// // // Контекст
const { theme, toggleTheme } = useContext(ThemeContext);

// // // Переменные для поиска
const [searchParams, setSearchParams] = useSearchParams();
const navigate = useNavigate();

const filters = useMemo(() => ({
    title: searchParams.get('search') || '',
    yearFrom: searchParams.get('date_from') || '',
    yearTo: searchParams.get('date_to') || '',
    genreFilter: searchParams.get('genre') || ''
}), [searchParams]);

// // // Список фильмов
const [films, dispatch] = useReducer(filmReducer, [...filmsData]);
const [isLoading, setIsLoading] = useState(true);

const setQueryParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams.toString());
        if (!value || value === '') newParams.delete(key); 

        else newParams.set(key, value);

        navigate(`?${newParams.toString()}`, { replace: true });
};

useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
}, []);

    
    
// // // Поиск
const resultFilteredFilms = useMemo(() => {  
let filteredFilms = [...films];

    if (filters.title.trim()) {
        const q = filters.title.trim().toLowerCase();
        filteredFilms = filteredFilms.filter((f) =>
            f.title.toLowerCase().includes(q)
        )
    }

    if (filters.yearFrom.trim()) {
        const year = Number(filters.yearFrom);
        if (!Number.isNaN(year)) {
            filteredFilms = filteredFilms.filter((f) => Number(f.date) >= year);
        }
    }

    if (filters.yearTo.trim()) {
        const toYear = Number(filters.yearTo);
        if (!Number.isNaN(toYear)) {
            filteredFilms = filteredFilms.filter((f) => Number(f.date) <= toYear);
        }
    }

    if (filters.genreFilter) {
        const g = filters.genreFilter.toLowerCase();
        filteredFilms = filteredFilms.filter((f) =>
            f.genre.toLowerCase().includes(g)
        );
    }

    return filteredFilms;
}, [films, filters]);

// // // Сортировка
const sortedFilms = useMemo(() => {
    return [...resultFilteredFilms].sort((a, b) => {
        const sumA = (a.like || 0) + (a.dislike || 0);
        const sumB = (b.like || 0) + (b.dislike || 0);

        return sumA - sumB;
    })
 }, [resultFilteredFilms]);

// // // Списки понравилось/не понравилось
const likedFilms = films.filter(film => film.likeFlag);
const dislikedFilms = films.filter(film => film.dislikeFlag);

// // // Функции лайка/дизлайка
const handleLike = useCallback((filmId) => dispatch({ type: 'like', payload: filmId }), [dispatch]);
const handleDislike = useCallback((filmId) => dispatch({ type: 'dislike', payload: filmId }), [dispatch]);

if (isLoading) return <p>Загрузка...</p>;

            
    return (
            <div className={theme}>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: "10px"}}>
                    <FilterFilms
                        title={filters.title}
                        yearFrom={filters.yearFrom}
                        yearTo={filters.yearTo}
                        genreFilter={filters.genreFilter}
                        searchTitle={(value) => setQueryParam('search', value)}
                        searchYearFrom={(value) => setQueryParam('date_from', value)}
                        searchYearTo={(value) => setQueryParam('date_to', value)}
                        searchGenre={(value) => setQueryParam('genre', value)}
                    />

                    
                        <ThemeChange theme={theme} toggleTheme={toggleTheme}/>
                    
                </div>

                <div>
                    {sortedFilms.length === 0 ? (
                        <p>Ничего не найдено</p>
                    ) : (
                    sortedFilms.map(n => (
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