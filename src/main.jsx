
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'
import App from './App.jsx'
import '@fontsource/encode-sans-expanded';
import { register } from 'swiper/element/bundle';
import { StrictMode } from 'react';
import "react-image-gallery/styles/css/image-gallery.css"
import '@fontsource-variable/cairo-play';
import '@fontsource-variable/cairo';
register();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
