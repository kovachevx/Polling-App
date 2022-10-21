import classes from './PollsPage.module.css';
import useStore from "../store/pollCreationStore";
import SinglePollCard from "./SinglePoll";
import useLoginStore from '../store/loginStore';

const PollsPage = props => {
    const { polls } = useStore();
    const { isLoggedIn } = useLoginStore();
    
    console.log(polls)

    return (
        <div className={classes.pollsContainer}>
            <h2 className={classes.h2}><i>Le Polls Paget</i></h2>
            {(polls.length > 0 && !isLoggedIn) && <p>Only logged in users can vote!</p>}
            {polls && polls.map(poll => {
                return (
                    <SinglePollCard key={Math.random().toString()} options={poll}></SinglePollCard>
                );
            })}
            {!polls.length &&
                <p className={classes.p}>...There are no polls yet! Be the first to create one by clicking on the "Create Poll" button.</p>}
        </div >
    );
}
export default PollsPage;