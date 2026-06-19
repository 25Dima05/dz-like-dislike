import { useState, useEffect, useRef } from 'react'
import '../App.css'

const FilterFilms = ({
    title,
    yearFrom,
    yearTo,
    genreFilter,
    searchTitle,
    searchYearFrom,
    searchYearTo,
    searchGenre,
}) => {
    const genres = [
        '',
        'триллер',
        'детектив',
        'драма',
        'криминал',
        'комедия',
        'боевик',
        'фантастика',
        'ужасы',
    ];

    const refInput = useRef(null)

    useEffect(() => {
        if (refInput.current) {
        refInput.current.focus()
        }
    }, [])

  return (
    <div style={{ marginBottom: '20px' }}>
        <input
            ref={refInput}
            type="text"
            placeholder="Название фильма"
            value={title}
            onChange={(e) => searchTitle(e.target.value)}
            style={{ marginRight: '8px', border: "2px solid violet" }}
        />
        <input
            type="number"
            placeholder="Год от"
            value={yearFrom}
            onChange={(e) => searchYearFrom(e.target.value)}
            style={{ marginRight: '8px', width: '80px', border: "2px solid violet" }}
        />
        <input
            type="number"
            placeholder="Год до"
            value={yearTo}
            onChange={(e) => searchYearTo(e.target.value)}
            style={{ marginRight: '8px', width: '80px', border: "2px solid violet" }}
        />
        <select
            value={genreFilter}
            style={{ marginRight: '8px', width: '100px', border: "2px solid violet" }}
            onChange={(e) => searchGenre(e.target.value)}
            
        >
        <option value="">Все жанры</option>
        {genres
            .filter((g) => g !== '')
            .map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
      </select>
    </div>
  );
};


export default FilterFilms