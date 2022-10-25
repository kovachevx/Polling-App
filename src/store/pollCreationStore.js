import React, { createContext } from "react";
import { useState, useRef } from "react";
import useLoginStore from "./loginStore";
import useLocalStorage from "../util/localStorageHook";
import { useHistory } from "react-router-dom";

const AppContext = createContext();

const optionsBase = [{
    id: Math.random().toString(),
    options:
        [{ id: Math.random().toString(), votes: 0 },
        { id: Math.random().toString(), votes: 0 }],
    totalVotes: 0,
    voters: []
}];

export function PollCreationStore(props) {
    const title = useRef('');
    const history = useHistory();
    const { loggedUser } = useLoginStore();
    const [options, setOptions] = useState(optionsBase);
    const [polls, setPolls] = useLocalStorage('polls', []);

    const addOptionHandler = (event) => {
        event.preventDefault();
        options[0].options.push({ id: Math.random().toString(), votes: 0 });

        setOptions(prevState => {
            return [...prevState];
        })
    };

    const inputChangeHandler = (event, idx) => {
        options[0].options[idx].text = event.target.value;
    }

    const removeOptionHandler = (event) => {
        event.preventDefault();
        if (options[0].options.length === 2) return;
        options[0].options.pop();

        setOptions(prevState => {
            return [...prevState];
        });
    };

    const submitFormHandler = (event) => {
        event.preventDefault();
        options[0].title = title.current.value;
        options[0].creatorId = loggedUser.id;
        options[0].creatorUsername = loggedUser.username;
        for (let option of options[0].options) {
            if (option.text === undefined || option.text === '' || !title || title.current.value === '') {
                return alert('No empty fields are allowed! Either fill in or remove the empty options.');
            }
        }

        setOptions(previousState => {
            return [...previousState];
        });

        setPolls(previousState => {
            return [options[0], ...previousState];
        })

        history.push('/submitted');
    };

    const createAnotherPollHandler = () => {
        setOptions([{
            id: Math.random().toString(),
            options:
                [{ id: Math.random().toString(), votes: 0 },
                { id: Math.random().toString(), votes: 0 }],
            totalVotes: 0,
            voters: []
        }]);
        history.push('/create');
    }

    const deletePollHandler = event => {
        const selectedPollIndex = polls.findIndex(poll => poll.id === event.target.id);
        polls.splice(selectedPollIndex, 1);
        setPolls(previousState => {
            return [...previousState];
        });
    }

    return (
        <AppContext.Provider
            value={{
                polls,
                title,
                options,
                setPolls,
                submitFormHandler,
                addOptionHandler,
                removeOptionHandler,
                inputChangeHandler,
                createAnotherPollHandler,
                deletePollHandler,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}

export default function useStore() {
    return React.useContext(AppContext);
};