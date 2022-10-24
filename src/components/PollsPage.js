import classes from './PollsPage.module.css';
import useStore from "../store/pollCreationStore";
import SinglePollCard from "./SinglePoll";
import useLoginStore from '../store/loginStore';
import { Button } from "reactstrap";
import { useEffect, useState } from 'react';

const PollsPage = props => {
    const { polls, registerPageRedirect, homePageRedirect } = useStore();
    const { isLoggedIn } = useLoginStore();
    const [soughtPhrase, setSoughtPhrase] = useState('');
    const [filteredPolls, setFilteredPolls] = useState(polls);

    const searchHandler = (event) => {
        setSoughtPhrase(event.target.value);
    }

    useEffect(() => {
        if (soughtPhrase.trim() === '') {
            setFilteredPolls(polls);
        } else {
            const filteredArray = [];
            for (let poll of polls) {
                if (poll.title.toLowerCase().includes(soughtPhrase.trim().toLowerCase())) {
                    filteredArray.push(poll);
                } else if (poll.creatorUsername.toLowerCase().includes(soughtPhrase.trim().toLowerCase())) {
                    filteredArray.push(poll);
                }
            }
            setFilteredPolls(filteredArray);
        }
    }, [soughtPhrase, polls])

    return (
        <div className={classes.pollsContainer}>
            <h2 className={classes.h2}><i>Les Polls Paget</i></h2>
            <div>
                <input placeholder='Find poll...' onChange={searchHandler} />
            </div>
            {(polls.length > 0 && !isLoggedIn) &&
                <div className={classes.registerPrompt}>
                    <p>Only logged in users can vote!</p>
                    <span>Don't have an account yet? &nbsp;</span>
                    <Button color="success" onClick={registerPageRedirect}>Register</Button>
                </div>
            }
            {filteredPolls.length > 0 && filteredPolls.map(poll => {
                return <SinglePollCard key={Math.random().toString()} options={poll} />;
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