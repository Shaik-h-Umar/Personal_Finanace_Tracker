import React from 'react';
import './styles.css';

function Button({ text, onClick, Very_dark_cyan,disabled }) {
  return (
    <div className={Very_dark_cyan ? 'btn btn-Very_dark_cyan' : 'btn'} 
    onClick={onClick}
    disabled={disabled}
    >
      {text}
    </div>
  );
}

export default Button;
