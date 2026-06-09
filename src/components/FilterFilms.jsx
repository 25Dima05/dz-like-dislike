import { useState } from 'react'
import '../App.css'

const FilterFilms = ({value, onChange}) => (
  <div style={{
    padding: "20px",
    fontSize: "20px"
    }}>
    <p>Поиск</p>
    
    <input
      type="text"
      value={value}
      onChange={(n) => onChange(n.target.value)}
      placeholder={'название, жанр, год'}
      style={{
        width: "30%",
        fontSize: "20px"
      }}
    />
  </div>
);

export default FilterFilms