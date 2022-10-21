import React, { createContext } from "react";
import { useState } from "react";
import useLoginStore from "./loginStore";
import useStore from "./pollCreationStore";
import useLocalStorage from "../util/localStorageHook";

const AppContext = createContext();

export function VoteStore(props) {
    const { polls, setPolls } = useStore();
    const [selectedOption, setSelectedOption] = useLocalStorage('selectedOption', '');
    const [voteModalProps, setVoteModalProps] = useLocalStorage('voteModalProps', { isOpen: false });
    const [resultModalProps, setResultModalProps] = useLocalStorage('resultModalProps', { isOpen: false });

    const { loggedUser } = useLoginStore();
    const toggleVoteModal = () => setVoteModalProps({ ...voteModalProps, isOpen: !voteModalProps.isOpen });
    const toggleResultsModal = () => setResultModalProps({ ...resultModalProps, isOpen: !resultModalProps.isOpen });

    const viewPollHandler = (event) => {
        const clickedPoll = polls.find(poll => poll.id === event.target.id);
        setSelectedOption('');
        setVoteModalProps({ ...clickedPoll, isOpen: true });
    }

    const voteHandler = (event, poll) => {
        const chosenOption = poll.options.find(option => option.text === selectedOption);
        chosenOption.votes++;

        const currentPoll = polls.find(p => p.id === poll.id);
        currentPoll.totalVotes++;

        poll.voters.push(loggedUser.id)

        setPolls(previousState => {
            return [...previousState];
        });

        if (selectedOption === '') {
            return alert('You have to select an option in order to vote.');
        }

        toggleVoteModal();
    }

    const viewResultsHandler = (event) => {
        const clickedPoll = polls.find(poll => poll.id === event.target.id);
        setResultModalProps({ ...clickedPoll, isOpen: true });
    };

    return (
        <AppContext.Provider
            value={{
                voteModalProps,
                resultModalProps,
                viewPollHandler,
                viewResultsHandler,
                setSelectedOption,
                voteHandler,
                toggleVoteModal,
                toggleResultsModal,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}

export default function useVoteStore() {
    return React.useContext(AppContext);
};