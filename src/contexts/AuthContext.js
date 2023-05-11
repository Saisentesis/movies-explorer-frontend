import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [user, setUser] = useState(false);
    const value = { user, setUser }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}