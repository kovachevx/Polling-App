import classes from './CreatePoll.module.css';
import useStore from '../store/pollCreationStore';
import Option from "./Option";
import { Button } from "reactstrap";
import useLoginStore from '../store/loginStore';

const CreatePoll = props => {
    const { isOnHomePage, submitFormHandler, title, options, addOptionHandler, removeOptionHandler, inputChangeHandler, homePageRedirect, registerPageRedirect } = useStore();
    const { isLoggedIn } = useLoginStore();

    return (
        <div>
            <h2 className={classes.h2}><i>CREATE POLL</i></h2>
            {(!isLoggedIn && !isOnHomePage) &&
                <div>
                    <p>Only logged in users can create polls.</p>
                    <span>Don't have an account yet? &nbsp;</span>
                    <Button color="success" onClick={registerPageRedirect}>Register</Button>
                </div>}
            {isLoggedIn && <form onSubmit={submitFormHandler} className={classes.formContainer}>
                <div className={classes.titleContainer}>
                    <label className={classes.label} htmlFor="title">Poll Title:</label>
                    <input className={classes.input} ref={title} id="title" type='text' />
                </div>
                <div className={classes.inputsContainer}>
                    <div className={classes.buttonsContainer}>
                        <div title={options[0].options.length <= 2 ? 'You must have at least 2 options' : 'Click to remove the last option'}>
                            <Button className={classes.btn} disabled={options[0].options.length <= 2} color='danger' onClick={removeOptionHandler}>REMOVE OPTION</Button>
                        </div>
                        <div title={'Click to add up to 10 options'}>
                            <Button className={classes.btn} disabled={options[0].options.length >= 10} color='warning' onClick={addOptionHandler}>ADD OPTION</Button>
                        </div>
                    </div>
                    {options[0].options.map((option, index) => {
                        return <Option inputChangeHandler={inputChangeHandler} key={index} num={index} />
                    })}
                </div>
                <div>
                    <Button className={classes.btn} color='success' type='submit'>CREATE POLL</Button>
                </div>
            </form>}
        </div>
    );
};

export default CreatePoll;