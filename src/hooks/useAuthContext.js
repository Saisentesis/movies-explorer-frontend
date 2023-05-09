import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function useAuthContext() {
    const authContext = useContext(AuthContext);
    return authContext
}