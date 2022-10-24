import classes from './App.module.css';
import CreatePoll from './components/CreatePoll';
import HomePage from './components/HomePage';
import SubmittedForm from './components/SubmittedForm';
import useStore from './store/pollCreationStore';
import PollsPage from './components/PollsPage';
import VoteModal from './components/VoteModal';
import ResultsModal from './components/ResultsModal'
import useLoginStore from './store/loginStore';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { useEffect, useState } from 'react';

function App() {
  const { isFormSubmitted, isOnPollsPage, isOnHomePage } = useStore();
  const { isOnLoginPage, isLoggedIn, getUsers } = useLoginStore();

  useEffect(() => {
    getUsers()
  }, [isOnLoginPage]);

  return (
    <div className={classes.appContainer}>
      <HomePage />
      {(!isFormSubmitted && !isOnPollsPage && !isOnHomePage && !isOnLoginPage) && < CreatePoll />}
      {(isFormSubmitted && !isOnPollsPage) && < SubmittedForm />}
      {(isOnPollsPage && !isOnLoginPage) && <PollsPage />}
      {isOnLoginPage && <LoginPage />}
      {(isOnHomePage && !isLoggedIn) && < RegisterPage />}
      <VoteModal />
      <ResultsModal />
    </div >
  );
}

export default App;
