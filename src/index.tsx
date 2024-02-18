import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AutoLogout from './components/layouts/AutoLogout';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './libs/redux/store';
import AuthProvider from './context/AuthProvider';
import NotifProvider from './context/NotifProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AutoLogout>
          <Provider store={store}>
            <NotifProvider>
              <App />
            </NotifProvider>
          </Provider>
        </AutoLogout>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
