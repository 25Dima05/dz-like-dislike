import { likeMinus, dislikeMinus, likePlus, dislikePlus } from './utils';

export function filmReducer(state, action) {
    switch (action.type) {
        case 'like': {
            return state.map((film) => {
                if (film.id !== action.payload) return film;

                if (film.likeFlag) return likeMinus(film);

                if (film.dislikeFlag) {
                    const updatedFilm = dislikeMinus(film);
                    return likePlus(updatedFilm);
                }

                return likePlus(film);
            });
        }

        case 'dislike': {
            return state.map((film) => {
                if (film.id !== action.payload) return film;

                if (film.dislikeFlag) return dislikeMinus(film);

                if (film.likeFlag) {
                    const updatedFilm = likeMinus(film);
                    return dislikePlus(updatedFilm);
                }

                return dislikePlus(film);
            });
        }

        default:
        throw new Error(`Неизвестный тип экшена: ${action.type}`);
    }
}