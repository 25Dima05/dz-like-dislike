import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import { ThemeProvider } from './components/ThemeProvider.jsx'
import './index.css'
import App from './App.jsx'
import FilmDetail from './components/FilmDetail';

createRoot(document.getElementById('root')).render(
    
    <ThemeProvider>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/film/:id" element={<FilmDetail />} />
            </Routes>
        </BrowserRouter>

    </ThemeProvider>
)
