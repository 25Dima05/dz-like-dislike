import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { filmsData } from '../data/data';

export default function FilmDetail() {
  const { id } = useParams()
  const film = filmsData.find(f => f.id === id)
  const [idx, setIdx] = useState(0)
  const t = useRef(null)

  useEffect(() => {
    if (t.current) clearInterval(t.current)
    
    if (!film || !film.poster?.length) return

    setIdx(0)
        t.current = setInterval(() => {
            setIdx(i => {
                const next = (i + 1) % film.poster.length

                return next
            })
        }, 3000)

    return () => clearInterval(t.current)
  }, [film])

  const imageSrc = film.poster[idx]

  return (
    <main>
        <h1>{film.title}</h1>
        <img
        src={imageSrc}
        alt={film.title}
        style={{ width: '400px', maxheight: 'auto', borderRadius: 8 }}
        loading="lazy"
      />
        <p>Год: {film.date}</p>
        <p>Жанр: {film.genre}</p>
        <p>Понравилось: {film.like}</p>
        <p>Не понравилось: {film.dislike}</p>
    </main>
  );
}