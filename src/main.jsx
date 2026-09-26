import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Release preload lock after initial paint completes
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('preload');
    if (document.body) document.body.classList.remove('preload');
  });
});

