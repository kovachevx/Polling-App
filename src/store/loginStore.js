import React, { createContext } from "react";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import useLocalStorage from "../util/localStorageHook";

const AppContext = createContext();

export function LoginStore(props) {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);
    const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', {});
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const loginHandler = async (event, username, password) => {
        event.preventDefault();

        if (username.trim() === '' || password.trim() === '') alert('All fields are required');

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

            if (!response.ok) {
                throw new Error(data.error.message)
            }

            setLoggedUser({ username: username.substring(0, username.indexOf('@')), token: data.idToken });
            setIsLoggedIn(true);
        } catch (err) {
            return alert(err.message);
        }
    }

    const registerHandler = async (event, email, password, repass) => {
        event.preventDefault();

        if (email.trim() === '' || password.trim() === '' || repass.trim() === '') {
            return alert('All fields are required');
        }

        if (password !== repass) {
            return alert('Passwords don\'t match!');
        }

        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true,
                    }),
                });

            const data = await response.json();

            if (!response.ok) {
                if (data.error.message === 'EMAIL_EXISTS') {
                    throw new Error('This email has already been registered!');
                } else {
                    throw new Error('Couldn\'t finish registration. Please retry.');
                }
            }

            setIsLoggedIn(true);
            setLoggedUser({ username: email.substring(0, email.indexOf('@')), token: data.idToken });
            setIsLoading(false);
            history.push('/polls');
        } catch (err) {
            return alert(err.message);
        }
    };

    return (
        <AppContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                loggedUser,
                setLoggedUser,
                isLoading,
                setIsLoading,
                loginHandler,
                registerHandler,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}

export default function useLoginStore() {
    return React.useContext(AppContext);
};