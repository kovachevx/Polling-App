import classes from './Navigation.module.css';
import useStore from '../store/pollCreationStore';
import { Button } from 'reactstrap';
import useLoginStore from '../store/loginStore';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navigation = props => {
    const { createAnotherPollHandler } = useStore();
    const { isLoggedIn, loggedUser, setIsLoggedIn, setLoggedUser } = useLoginStore();

    const navigate = useNavigate();

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
                <Button className={classes.btn} onClick={() => navigate('/polls')} color='success'>View Polls</Button>
                <Button className={classes.btn} onClick={createAnotherPollHandler} color='primary'>Create Poll</Button>
                <div>
                    <Button className={classes.btn}
                        color={!isLoggedIn ? 'warning' : 'danger'}
                        onClick={isLoggedIn ? logoutHandler : () => navigate('/login')}
                    >
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </Button>
                </div>
            </div>
        </div >
    );
}
export default Navigation;