import classes from './Navigation.module.css';
import useStore from '../store/pollCreationStore';
import { Button } from 'reactstrap';
import useLoginStore from '../store/loginStore';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Navigation = props => {
    const { createAnotherPollHandler, getPolls } = useStore();
    const { isLoggedIn, loggedUser, setIsLoggedIn, setLoggedUser } = useLoginStore();

    const history = useHistory();

    const viewPollsNavigation = async () => {
         getPolls();
        
        history.push('/polls');
    }

    const logoutHandler = (event) => {
        setIsLoggedIn(false);
        setLoggedUser({});
    }

    return (
        <div>
            <div classes={classes.heading1}>
                <h1><Link className={classes.link} to='/'><i>POLLsha</i></Link></h1>
                <div className={classes.username}>
                    {isLoggedIn && <div>{loggedUser.username}</div>}
                </div>
            </div>
            <div className={classes.headingButtonContainer}>
                <Button className={classes.btn} onClick={viewPollsNavigation} color='success'>View Polls</Button>
                <Button className={classes.btn} onClick={createAnotherPollHandler} color='primary'>Create Poll</Button>
                <div>
                    <Button className={classes.btn}
                        color={!isLoggedIn ? 'warning' : 'danger'}
                        onClick={isLoggedIn ? logoutHandler : () => history.push('/login')}
                    >
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </Button>
                </div>
            </div>
        </div >
    );
}
export default Navigation;