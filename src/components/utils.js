export function likeMinus(arrFilm) {
    return {
        ...arrFilm,
        like: arrFilm.like - 1,
        likeFlag: false,
    }
}

export function dislikeMinus(arrFilm) {
    return {
        ...arrFilm,
        dislike: arrFilm.dislike - 1,
        dislikeFlag: false,
    } 
}

export function likePlus(arrFilm) {
    return {
        ...arrFilm,
        like: arrFilm.like + 1,
        likeFlag: true,
        view: arrFilm.view + 1
    }
}

export function dislikePlus(arrFilm) {
    return {
        ...arrFilm,
        dislike: arrFilm.dislike + 1,
        dislikeFlag: true,
        view: arrFilm.view + 1
    }
}