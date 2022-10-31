import React, { createContext } from "react";
import { useState, useRef } from "react";
import useLoginStore from "./loginStore";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const { loggedUser, setIsLoading } = useLoginStore();
    const [options, setOptions] = useState(optionsBase);
    const [fetchedPolls, setFetchedPolls] = useState([]);

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
        options[0].voters = [];

        const currentOptions = [];

        for (let option of options[0].options) {
            if (option.text === undefined || option.text === '' || !title || title.current.value === '') {
                return alert('No empty fields are allowed! Either fill in or remove the empty options.');
            }
            if (currentOptions.includes(option.text)) {
                return alert('No matching options are allowed. Either change or remove the option in question.')
            } else {
                currentOptions.push(option.text);
            }
        }

        setOptions(previousState => {
            return [...previousState];
        });

        postPoll(options[0]);
        navigate('/submitted', { replace: true });
    };

    const createAnotherPollHandler = () => {
        setOptions([{
            id: Math.random().toString(),
            options:
                [{ id: Math.random().toString(), votes: 0 },
                { id: Math.random().toString(), votes: 0 }],
            totalVotes: 0,
            voters: [],
        }]);
        navigate('/create');
    }

    const deletePollHandler = async (event) => {
        const selectedPoll = fetchedPolls.find(poll => poll.id === event.target.id);
        try {
            await fetch(`https://polling-app-2bee2-default-rtdb.firebaseio.com/rooms/${selectedPoll.pollId}.json`, { method: 'DELETE' });
            await getPolls();
        } catch (err) {
            alert('There was an error processing your deletion request. Please try again later.');
        }
    }

    async function getPolls() {
        try {
            setIsLoading(true);
            const response = await fetch('https://polling-app-2bee2-default-rtdb.firebaseio.com/rooms.json');
            const data = await response.json();
            const userData = [];
            for (let userId in data) {
                data[userId].pollId = userId;
                userData.push(data[userId]);
            }
            setFetchedPolls([...userData].reverse());
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    }

    async function postPoll(newPoll) {
        try {
            const response = await fetch('https://polling-app-2bee2-default-rtdb.firebaseio.com/rooms.json', {
                method: 'POST',
                body: JSON.stringify(newPoll)
            });
            if (!response.ok) throw new Error('Losho');
        } catch (err) {
            alert('There was an error posting your poll. Please retry submitting it.');
        }
    }

    return (
        <AppContext.Provider
            value={{
                title,
                options,
                fetchedPolls,
                getPolls,
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