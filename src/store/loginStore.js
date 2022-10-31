import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import useLocalStorage from "../util/localStorageHook";
import useStore from "./pollCreationStore";

const AppContext = createContext();

export function LoginStore(props) {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
    const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', {});
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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

        if (username.trim() === '' || password.trim() === '') alert('All fields are required');

        let successfulLogin = false;

        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password,
                        returnSecureToken: true,
                    }),
                });

            const data = await response.json();

            console.log(data);
            console.log(data.idToken)

            if (!response.ok) {
                throw new Error('epa ne stava mbe')
            }

            setLoggedUser({ username: username.substring(0, username.indexOf('@')), token: data.idToken });
            setIsLoggedIn(true);
            successfulLogin = true;

        } catch (err) {
            console.log(err.message);
        }


        // await getUsers();

        // users.forEach(user => {
        //     if (user.username === username && user.password === password) {
        //         setLoggedUser({ id: user.id, username: user.username, role: user.role });
        //         setIsLoggedIn(true);
        //         successfulLogin = true;
        //     }
        // });

        if (!successfulLogin) alert('Invalid credentials!');
    }

    const registerHandler = async (event, username, password, repass) => {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '' || repass.trim() === '') {
            return alert('All fields are required');
        }

        // await getUsers();
        // let userAlreadyExists = false;

        // for (let user of users) {
        //     if (user.username === username) {
        //         userAlreadyExists = true;
        //     }
        // }

        // if (userAlreadyExists) {
        //     return alert(`${username} is already taken, please choose another username!`);
        // }

        if (password !== repass) {
            return alert('Passwords don\'t match!');
        }

        // setIsLoading(true);

        // const newUser = {
        //     id: Math.random().toString(),
        //     username,
        //     password,
        //     role: 'user'
        // }

        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password,
                        returnSecureToken: true,
                    }),
                });

            console.log(response);
            const data = await response.json();
            console.log(data);

            setIsLoggedIn(true);
            setLoggedUser({ username: username.substring(0, username.indexOf('@')), token: data.idToken });
            setIsLoading(false);
            if (!response.ok) {
                throw new Error('epa ne stava mbe')
            }

        } catch (err) {
            console.log(err.message);
        }




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
                isLoading,
                setIsLoading,
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