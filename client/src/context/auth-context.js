import {createContext} from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    _id : null,
    token: null,
    login: () => {},
    logout: () => {}
});