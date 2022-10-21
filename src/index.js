import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PollCreationStore } from './store/pollCreationStore';
import { VoteStore } from './store/voteStore';
import { LoginStore } from './store/loginStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <LoginStore>
    <PollCreationStore>
      <VoteStore>
        <App />
      </VoteStore>
    </PollCreationStore>
  </LoginStore>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
