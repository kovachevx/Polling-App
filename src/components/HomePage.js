import classes from './HomePage.module.css';
import useStore from '../store/pollCreationStore';
import { Button } from 'reactstrap';
import useLoginStore from '../store/loginStore';
import { useState } from 'react';

const HomePage = props => {
    const { createAnotherPollHandler, setIsOnPollsPage, homePageRedirect, isOnHomePage, setIsOnHomePage, setIsFormSubmitted, registerPageRedirect } = useStore();
    const { setIsOnLoginPage, isLoggedIn, setIsLoggedIn, setLoggedUser, loggedUser, isOnRegisterPage, setIsOnRegisterPage } = useLoginStore();

    const visitLoginPageHandler = (event) => {
        setIsFormSubmitted(false);
        setIsOnPollsPage(false);
        setIsOnHomePage(false);
        setIsOnRegisterPage(false);
        setIsOnLoginPage(true);
    };

    const visitPollsPageHandler = (event) => {
        setIsOnHomePage(false);
        setIsOnLoginPage(false);
        setIsFormSubmitted(false);
        setIsOnRegisterPage(false);
        setIsOnPollsPage(true);
    }

    const logoutHandler = (event) => {
        setIsLoggedIn(false);
        setLoggedUser({});
        homePageRedirect();
    }

    return (
        <div>
            <div classes={classes.heading1}>
                <h1><i onClick={homePageRedirect}>POLLsha</i></h1>
                <div className={classes.username}>
                    {isLoggedIn && <div>{loggedUser.username}</div>}
                </div>
            </div>
            <div className={classes.headingButtonContainer}>
                <Button className={classes.btn} color='success' onClick={visitPollsPageHandler}>View Polls</Button>
                <Button className={classes.btn} color='primary' onClick={createAnotherPollHandler}>Create Poll</Button>
                <div>
                    <Button className={classes.btn} color={!isLoggedIn ? 'warning' : 'danger'} onClick={!isLoggedIn ? visitLoginPageHandler : logoutHandler}>{isLoggedIn ? 'Logout' : 'Login'}</Button>
                </div>
            </div>

            {(isOnHomePage && !isOnRegisterPage) &&
                <div className={classes.summary}>
                    <h2 classes={classes.heading2}>Welcome to Pollsha</h2>
                    <p>The easiest way to create polls, vote and figure out how, when, and where to get wasted with your friends.</p>
                    <p>Approved by <i>ГЕРБ, ДПС</i> and the rest of the <u>totally-not-corrupted</u> political parties.</p>

                </div>
            }
            {(isOnHomePage && !isLoggedIn) &&
                <div className={classes.registerPrompt}>
                    <span>You'll need to log in so that you can create polls and vote.</span>
                    <div>
                        <span>Don't have an account yet? &nbsp;</span>
                        <Button color="success" onClick={registerPageRedirect}>Register</Button>
                    </div>
                </div>
            }
        </div >
    );
};

export default HomePage;