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

    const borderStyle = { marginRight: '8px', border: "2px solid violet", borderRadius: "8px" }

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
            style={borderStyle}
        />
        <input
            type="number"
            placeholder="Год от"
            value={yearFrom}
            onChange={(e) => searchYearFrom(e.target.value)}
            style={borderStyle}
        />
        <input
            type="number"
            placeholder="Год до"
            value={yearTo}
            onChange={(e) => searchYearTo(e.target.value)}
            style={borderStyle}
        />
        <select
            value={genreFilter}
            style={borderStyle}
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