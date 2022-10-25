import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import useLocalStorage from "../util/localStorageHook";

const AppContext = createContext();

export function LoginStore(props) {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
    const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', {});
    const [users, setUsers] = useState([]);
    const history = useHistory();

    async function getUsers() {
        try {
            const response = await fetch('https://polling-app-2bee2-default-rtdb.firebaseio.com/users.json');
            const data = await response.json();
            const userData = [];
            for (let userId in data) {
                userData.push(data[userId]);
            }
            setUsers(userData);
        } catch (err) {
            console.log(err);
        }
    }

    const loginHandler = async (event, username, password) => {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '') {
            return alert('All fields are required');
        }

        await getUsers();

        let successfulLogin = false;

        users.forEach(user => {
            if (user.username === username && user.password === password) {
                setLoggedUser({ id: user.id, username: user.username });
                setIsLoggedIn(true);
                successfulLogin = true;
            }
        });

        if (!successfulLogin) {
            return alert('Invalid credentials!');
        }
    }

    const registerHandler = async (event, username, password, repass) => {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '' || repass.trim() === '') {
            return alert('All fields are required');
        }

        getUsers();

        let userAlreadyExists = false;

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
            id: Math.random().toString(),
            username,
            password
        }

        await fetch('https://polling-app-2bee2-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify(newUser)
        });

        setIsLoggedIn(true);
        setLoggedUser({ id: newUser.id, username: newUser.username });
        await getUsers();

        history.push('/polls');
    };

    return (
        <AppContext.Provider
            value={{
                users,
                isLoggedIn,
                setIsLoggedIn,
                loggedUser,
                setLoggedUser,
                loginHandler,
                registerHandler,
                getUsers
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}

export default function useLoginStore() {
    return React.useContext(AppContext);
};