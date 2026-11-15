import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import './reference.css';
import './footer.css';
import './courses.css';
import './events.css';
import './freshman.css';
import './learning-map.css';
import './association-work.css';
import './hero-campus.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
