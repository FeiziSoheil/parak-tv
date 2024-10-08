import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(

    <BrowserRouter basename="/parak-tv">
    <App />
    </BrowserRouter>

)
