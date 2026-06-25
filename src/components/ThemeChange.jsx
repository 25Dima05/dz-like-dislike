function ThemeChange({theme, toggleTheme}) {
console.log('ThemeChange получает:', theme);
    return (
        <button onClick={() => toggleTheme() }>{theme === 'light' ? 'Ночная тема' : 'Дневная тема'}</button>
    )
}

export default ThemeChange