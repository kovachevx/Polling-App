import React, { createContext, useEffect } from "react";
import { useState } from "react";
import useLocalStorage from "../util/localStorageHook";

const AppContext = createContext();

export function LoginStore(props) {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
    const [isOnLoginPage, setIsOnLoginPage] = useLocalStorage('isOnLoginPage', false);
    const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', {});

    const usersList = [
        { id: 0, username: 'vasko', password: '123', },
        { id: 1, username: 'koceto', password: '123', },
        { id: 2, username: 'dog', password: '123', }
    ];

    const [users, setUsers] = useLocalStorage('users', usersList);

    const loginHandler = (event, username, password) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            return alert('All fields are required');
        }

        let successfulLogin = false;

        users.forEach(user => {
            if (user.username === username && user.password === password) {
                setLoggedUser(user);
                setIsLoggedIn(true);
                successfulLogin = true;
            }
        });

        if (!successfulLogin) {
            return alert('Invalid credentials!');
        }
    }

    const registerHandler = (event, username, password, repass) => {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '' || repass.trim() === '') {
            return alert('All fields are required');
        }

        let userAlreadyExists = false;
        console.log(users);
        for (let user of users) {
            if (user.username === username) {
                userAlreadyExists = true;
            }
        }

        if (userAlreadyExists) {
            return alert(`${username} is already taken, please choose another username!`);
        }

        if (password !== repass) {
            return alert('Passwords don\'t match!');
        }

        const newUser = {
            id: users.length,
            username,
            password
        }

        users.push(newUser);
        setUsers(prevstate => [...prevstate]);
        setLoggedUser(newUser);
        setIsLoggedIn(true);
    };

    return (
        <AppContext.Provider
            value={{
                users, loginHandler,
                isLoggedIn, setIsLoggedIn,
                isOnLoginPage, setIsOnLoginPage,
                loggedUser, setLoggedUser,
                registerHandler
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}

export default function useLoginStore() {
    return React.useContext(AppContext);
};