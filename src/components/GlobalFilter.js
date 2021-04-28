import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import './header/header.css'; 

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);

  return (
    <span>
    <label>
    Pesquisar:      
    </label>
      <input placeholder='Rota, número de pedido...' value={value || ''} onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }} 
        className='pesquisa'
      />
    </span>
  )
}
