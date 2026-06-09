import { useState, useEffect } from 'react'
import '../App.css'

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

export default CountView