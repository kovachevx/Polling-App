import logo from './logo.svg';
import classes from './App.module.css';
import CreatePoll from './components/CreatePoll';
import HomePage from './components/HomePage';
import SubmittedForm from './components/SubmittedForm';
import useStore from './store/pollCreationStore';
import PollsPage from './components/PollsPage';
import { useEffect, useState } from 'react';
import VoteModal from './components/VoteModal';
import ResultsModal from './components/ResultsModal'
import useLoginStore from './store/loginStore';
import LoginPage from './components/LoginPage';

function App() {
  const { isFormSubmitted, isOnPollsPage, isOnHomePage } = useStore();
  const { isOnLoginPage } = useLoginStore();

  return (
    <div className={classes.appContainer}>
      <HomePage />
      {(!isFormSubmitted && !isOnPollsPage && !isOnHomePage && !isOnLoginPage) && < CreatePoll />}
      {(isFormSubmitted && !isOnPollsPage) && < SubmittedForm />}
      {(isOnPollsPage && !isOnLoginPage) && <PollsPage />}
      {isOnLoginPage && <LoginPage />}
      <VoteModal />
      <ResultsModal />
    </div >
  );
}

export default App;
