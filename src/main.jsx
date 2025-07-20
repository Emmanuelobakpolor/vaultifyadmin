import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './pages/Login.jsx'
import App from './App.jsx'
import { Route, Routes} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import ShopcontextProvider from './context.jsx';
import {store,persistor} from "../src/redux/store.js"
import { Provider } from 'react-redux'
import {PersistGate} from "redux-persist/integration/react"


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    
    <BrowserRouter>
    <ShopcontextProvider>
      <PersistGate persistor={persistor} loading={null}>
      <App className="font-Montserrat " />
      </PersistGate>
      </ShopcontextProvider>
    </BrowserRouter>
  
  </Provider >,
)
