import React from 'react'
import { auth } from '../utils/firebaseApp'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth"
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export const userContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [msg,setMsg] = useState({}) //

    console.log(msg)

    useEffect(() => {
        const unsubsrcibe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => { unsubsrcibe() }
    }, [])

    const signInUser = async (email, password) => {
        setMsg({})
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setMsg({signin:"LOGGED... in... successfully..."})
        } catch (error) {
            console.log(error);
            setMsg({err:error.message})
        }
    }

    const logOutUser = async () => 
    {
        await signOut(auth)
        setMsg({})
    }

    const singUpUser = async (email,password,displayName) =>
    {
        try {
            await createUserWithEmailAndPassword(auth,email,password)
            await updateProfile(auth.currentUser, {displayName})
            setMsg({})
            setMsg({signup:"sikeres regisztracio"})
            
        } catch (error) {
            setMsg({err:error.message})

        }
    }

    const resetPassword = async (email) =>
    {
        try {
            await sendPasswordResetEmail(auth, email)
            setMsg({})
            setMsg({resetPw:"Password reset email sent"})
        } catch (error) {
            setMsg({err:error.message})
        }
    }

    return (

        <userContext.Provider value={{ user, signInUser, logOutUser, msg, setMsg, singUpUser, resetPassword }}>
            {children}
        </userContext.Provider>
    
    )
} 