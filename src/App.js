import classes from './App.module.css';
import CreatePoll from './components/CreatePoll';
import HomePage from './components/HomePage';
import SubmittedForm from './components/SubmittedForm';
import PollsPage from './components/PollsPage';
import VoteModal from './components/VoteModal';
import ResultsModal from './components/ResultsModal'
import useLoginStore from './store/loginStore';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navigation from './components/Navigation';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import useStore from './store/pollCreationStore';

function App() {
  const { getUsers } = useLoginStore();
  const { getPolls } = useStore();

  useEffect(() => {
    getUsers();
    getPolls();
  }, []);

  return (
    <div className={classes.appContainer}>
      <Navigation />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/create' component={CreatePoll} />
        <Route path='/submitted' component={SubmittedForm} />
        <Route path='/polls' component={PollsPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
      </Switch >
      <VoteModal />
      <ResultsModal />
    </div >
  );
}

export default App;
