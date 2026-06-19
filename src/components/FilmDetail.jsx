import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { filmsData } from './data';

export default function FilmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [film, setFilm] = useState(null);

  useEffect(() => {
    const found = filmsData.find((f) => f.id === id);
    setFilm(found);
  }, [id]);

  if (!film) {
    return (
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <h2>Фильм не найден</h2>
      </div>
    );
  }

  return (
    <main>
        <img src={film.poster} style={{ maxWidth: '500px'}}/>
        <h1>{film.title}</h1>
        <p>Год: {film.date}</p>
        <p>Жанр: {film.genre}</p>
        <p>Понравилось: {film.like}</p>
        <p>Не понравилось: {film.dislike}</p>
    </main>
  );
}