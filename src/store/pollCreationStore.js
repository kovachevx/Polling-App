import React, { createContext, useEffect } from "react";
import { useState, useRef } from "react";
import useLoginStore from "./loginStore";
import useLocalStorage from "../util/localStorageHook";

const AppContext = createContext();

export function PollCreationStore(props) {
    const { setIsOnLoginPage, setIsOnRegisterPage } = useLoginStore();

    const title = useRef('');
    const [options, setOptions] = useState([{
        id: Math.random().toString(),
        options:
            [{ id: Math.random().toString(), votes: 0 },
            { id: Math.random().toString(), votes: 0 }],
        totalVotes: 0,
        voters: []
    }]);

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isOnPollsPage, setIsOnPollsPage] = useState(false);
    const [isOnHomePage, setIsOnHomePage] = useState(true);
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

    const homePageRedirect = (event) => {
        setIsFormSubmitted(false);
        setIsOnPollsPage(false);
        setIsOnLoginPage(false);
        setIsOnRegisterPage(false);
        setIsOnHomePage(true);
    };

    const registerPageRedirect = (event) => {
        setIsFormSubmitted(false);
        setIsOnPollsPage(false);
        setIsOnLoginPage(false);
        setIsOnHomePage(true);
        setIsOnRegisterPage(true);
    };

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

        setIsFormSubmitted(true);
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
        setIsOnLoginPage(false);
        setIsOnPollsPage(false);
        setIsFormSubmitted(false);
        setIsOnRegisterPage(false);
        setIsOnHomePage(false);
    }

    return (
        <AppContext.Provider
            value={{
                polls,
                title,
                options,
                isFormSubmitted,
                isOnPollsPage,
                isOnHomePage,
                setPolls,
                registerPageRedirect,
                setIsOnPollsPage,
                setIsOnHomePage,
                setIsFormSubmitted,
                homePageRedirect,
                submitFormHandler,
                addOptionHandler,
                removeOptionHandler,
                inputChangeHandler,
                createAnotherPollHandler,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}

export default function useStore() {
    return React.useContext(AppContext);
};