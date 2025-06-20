import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import {store} from './redux/store.jsx'
import { loginSuccess } from "./redux/authSlice";

const token = localStorage.getItem("userToken");
const email = localStorage.getItem("userEmail");

if (token && email) {
  // If a token and email are found in localStorage,
  // dispatch the loginSuccess action to update the Redux store.
  store.dispatch(loginSuccess({ email, token }));
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
