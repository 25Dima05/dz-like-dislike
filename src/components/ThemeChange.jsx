function ThemeChange({theme, toggleTheme}) {

    return (
        <button onClick={() => toggleTheme() }>{theme === 'light' ? 'Ночная тема' : 'Дневная тема'}</button>
    )
}

export default ThemeChange