import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import './main.css'

function App() {

const objectStyle = {
    color: "violet"

}


const [state, setState] = useState({
    like: 131,
    dislike: 29,

    likeFlag: false,
    dislikeFlag: false
});


function likeMinus() {
    setState(prevState => {

        return {
            ...prevState,
            like: state.like - 1,
            likeFlag: false
        }
    })
}

function dislikeMinus() {
    setState(prevState => {

        return {
            ...prevState,
            dislike: state.dislike - 1,
            dislikeFlag: false
        }   
    })
}

function likePlus() {
    setState(prevState => {

        return {
            ...prevState,
            like: state.like + 1,
            likeFlag: true,
        }
    })
}

function dislikePlus() {
    setState(prevState => {
        return {
            ...prevState,
            dislike: state.dislike + 1,
            dislikeFlag: true
        }
    })
}


function handleLike() {
    if (state.likeFlag) likeMinus()

    else {
        if (state.dislikeFlag) dislikeMinus()
        
        likePlus()
    }
}

function handleDislike() {
    if (state.dislikeFlag) dislikeMinus()

    else {
        if (state.likeFlag) likeMinus()

        dislikePlus()
    }

    
}


const likeColor = state.likeFlag && !state.dislikeFlag ? "green" : null 

const dislikeColor = state.dislikeFlag && !state.likeFlag ? "red" : null

const displayMovie = state.likeFlag ? "flex" : "none"

    return (
        <div>
            <h1 style={objectStyle}>Олдбой</h1>
            <p style={objectStyle}>2003</p>
            <p style={objectStyle}>Триллер, детектив, драма, криминал</p>

            <p >Нравится: {state.like}</p>
            <p>Не нравится: {state.dislike}</p>

            <button style={{
                backgroundColor: likeColor
            }} className='actionButton' onClick={handleLike}>Нравится</button>

            <button style={{
                backgroundColor: dislikeColor
            }} className='actionButton' onClick={handleDislike}>Не нравится</button>

            <div style={{display: displayMovie}} className='nameMovie'>
                Олдбой
            </div>
        </div>
    )
}

export default App
