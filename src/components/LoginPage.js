import useLoginStore from "../store/loginStore";
import { Button } from "reactstrap";
import classes from './LoginPage.module.css';
import useLocalStorage from '../util/localStorageHook';
import useStore from "../store/pollCreationStore";

const LoginPage = props => {
    const { homePageRedirect } = useStore();
    const { loginHandler, isLoggedIn } = useLoginStore();
    const [enteredUsername, setEnteredUsername] = useLocalStorage('enteredUsername', '');
    const [enteredPassword, setEnteredPassword] = useLocalStorage('enteredPassword', '');

    const getUsername = (event) => {
        setEnteredUsername(event.target.value);
    }

    const getPassword = (event) => {
        setEnteredPassword(event.target.value);
    }

    return (
        <div>
            <h2 className={classes.h2}>Login</h2>
            {!isLoggedIn && < form onSubmit={(e) => loginHandler(e, enteredUsername, enteredPassword)} className={classes.formContainer}>
                <div className={classes.inputsContainer}>
                    <div className='d-flex justify-content-center'>
                        <label htmlFor="username">Username:&nbsp;</label>
                        <input type="text" id="username" onChange={getUsername} required />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <label htmlFor="password">Password:&nbsp;</label>
                        <input type="password" id="password" onChange={getPassword} required />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Button className={classes.btn} color='primary'>Log in</Button>
                    </div>
                </div>
                <div>
                    <span>Don't have an account yet? &nbsp;</span>
                    <Button color="success" onClick={homePageRedirect}>Register</Button>
                </div>
            </form>}
            {isLoggedIn &&
                <div>
                    <p>You have successfully logged in!</p>
                    <p>Feel free to create your own, or browse throughout the existing polls.</p>
                </div>}
        </div >
    );
}

export default LoginPage;