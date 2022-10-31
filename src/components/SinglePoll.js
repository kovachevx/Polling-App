import { Button } from "reactstrap";
import useLoginStore from "../store/loginStore";
import useStore from "../store/pollCreationStore";
import useVoteStore from "../store/voteStore";
import classes from './SinglePoll.module.css';

const SinglePollCard = ({ options }) => {
    const { viewPollHandler, viewResultsHandler } = useVoteStore();
    const { isLoggedIn, loggedUser } = useLoginStore();
    const { deletePollHandler } = useStore();

    return (
        <div className={classes.singlePollContainer} key={options.id}  >
            <div className={classes.title}>
                {options.title}{options.title.endsWith('?') ? '' : '?'}
                <p className={classes.creator}>created by <u><b><i>{options.creatorUsername}</i></b></u></p>
            </div>
            <div>
                <img className={classes.img} src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/02/progressbars-fine.png?w=551&ssl=1"></img>
            </div>
            <div>
                {(isLoggedIn && options.voters?.includes(loggedUser.username)) && <p>You've already voted!</p>}
                {(isLoggedIn && !options.voters?.includes(loggedUser.username)) && <Button className={classes.btn} id={options.id} color='primary' onClick={viewPollHandler}>Vote</Button>}
                <Button className={classes.btn} id={options.id} color='success' onClick={viewResultsHandler}>Results</Button>
                {(loggedUser.id === options.creatorId || loggedUser.username === 'kovdi') &&
                    <Button className={classes.btn} id={options.id} color='danger' onClick={deletePollHandler}>Delete</Button>
                }
            </div>
        </div >
    );
};

export default SinglePollCard;