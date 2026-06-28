import { useState, useEffect, useReducer, useContext, useMemo } from 'react'
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

const title = searchParams.get('search') || '';
const yearFrom = searchParams.get('date_from') || '';
const yearTo = searchParams.get('date_to') || '';
const genreFilter = searchParams.get('genre') || '';

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
return filteredFilms.toSorted((a, b) => {
    const sumA = a.like + a.dislike;
    const sumB = b.like + b.dislike;

    return sumA - sumB;
});
}, [films, title, yearFrom, yearTo, genreFilter]);

// // // Списки понравилось/не понравилось
const likedFilms = films.filter(film => film.likeFlag);
const dislikedFilms = films.filter(film => film.dislikeFlag);

// // // Функции лайка/дизлайка
const handleLike = (filmId) => dispatch({ type: 'like', payload: filmId });
const handleDislike = (filmId) => dispatch({ type: 'dislike', payload: filmId });

if (isLoading) return <p>Загрузка...</p>;

            
    return (
            <div className={theme}>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: "10px"}}>
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

                    
                        <ThemeChange theme={theme} toggleTheme={toggleTheme}/>
                    
                </div>

                <div>
                    {resultFilteredFilms.length === 0 ? (
                        <p>Ничего не найдено</p>
                    ) : (
                    resultFilteredFilms.map(n => (
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