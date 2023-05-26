import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { StoreContext, store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StoreContext.Provider value={store}>
    <App />
  // </StoreContext.Provider>,
)

