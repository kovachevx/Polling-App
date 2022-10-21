import React, { createContext, useEffect } from "react";
import { useState } from "react";
import useLocalStorage from "../util/localStorageHook";

const AppContext = createContext();

export function LoginStore(props) {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
    const [isOnLoginPage, setIsOnLoginPage] = useLocalStorage('isOnLoginPage', false);
    const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', {});

    const users = [
        { id: 1, username: 'vasko', password: '123', votedFor: {} },
        { id: 2, username: 'koceto', password: '123', votedFor: {} },
        { id: 3, username: 'dog', password: '123', votedFor: {} }
    ];

    const loginHandler = (event, username, password) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            return alert('All fields are required');
        }

        let successfulLogIn = false;

        users.forEach(user => {
            if (user.username === username && user.password === password) {
                setLoggedUser(user);
                setIsLoggedIn(true);
                successfulLogIn = true;
            }
        });

        if (!successfulLogIn) {
            return alert('Invalid credentials!');
        }
    }

    return (
        <AppContext.Provider
            value={{
                users, loginHandler,
                isLoggedIn, setIsLoggedIn,
                isOnLoginPage, setIsOnLoginPage,
                loggedUser, setLoggedUser,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}

export default function useLoginStore() {
    return React.useContext(AppContext);
};