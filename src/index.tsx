import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

const Init  = () => {
  return ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

Init();
