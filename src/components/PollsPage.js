import classes from './PollsPage.module.css';
import useStore from "../store/pollCreationStore";
import SinglePollCard from "./SinglePoll";
import useLoginStore from '../store/loginStore';
import { Button } from "reactstrap";

const PollsPage = props => {
    const { polls, registerPageRedirect, homePageRedirect } = useStore();
    const { isLoggedIn } = useLoginStore();

    return (
        <div className={classes.pollsContainer}>
            <h2 className={classes.h2}><i>Le Polls Paget</i></h2>
            {(polls.length > 0 && !isLoggedIn) &&
                <div>
                    <p>Only logged in users can vote!</p>
                    <span>Don't have an account yet? &nbsp;</span>
                    <Button color="success" onClick={registerPageRedirect}>Register</Button>
                </div>
            }
            {polls && polls.map(poll => {
                return (
                    <SinglePollCard key={Math.random().toString()} options={poll}></SinglePollCard>
                );
            })}
            {(!polls.length && isLoggedIn) &&
                <p className={classes.p}>...There are no polls yet! Be the first to create one by clicking on the "Create Poll" button.</p>}
            {(!polls.length && !isLoggedIn) &&
                <div className={classes.registerPrompt}>
                    <p className={classes.p}>...There are no polls yet! Be the first to create one by logging in and clicking on the "Create Poll" button.</p>
                    <span>Don't have an account yet? &nbsp;</span>
                    <Button color="success" onClick={homePageRedirect}>Register</Button>
                </div>}
        </div >
    );
}
export default PollsPage;