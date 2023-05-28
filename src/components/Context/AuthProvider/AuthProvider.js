import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import app from '../../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendEmailVerification } from "firebase/auth"

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    const emailVerify = () => {
        return sendEmailVerification(auth.currentUser);
    }

    const logOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser === null || currentUser.emailVerified) {
                setUser(currentUser)
                console.log(currentUser)
            }
            setLoading(false)
        });
        return () => unsubscribe();
    }, [])

    const authInfo = {
        user,
        signInUser,
        createUser,
        logOutUser,
        emailVerify,
        updateUserProfile,
        loading,
        setLoading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;