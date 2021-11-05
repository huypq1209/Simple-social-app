import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform, Image, Text, View, ActivityIndicator } from 'react-native'
import firebase from '../Utilities/firebaseDb'

import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'



// const Loading = props => {
//     const { navigation } = props
//     const [isAuth, setIsAuth] = useState(false)
//     useEffect(() => {
//         const subs = firebase.auth()
//             .onAuthStateChanged(user => {
//                 if (user) {
//                     setIsAuth(true)
//                 }
//             })
//         return subs
//     }, [isAuth])


//     if (isAuth) {
//         return <Home />
//     } else {
//         return <SignUp {...navigation} />
//     }

// }
const Loading = props => {
    const { navigation } = props
    const [isAuth, setIsAuth] = useState(false)
    
    useEffect(() => {
        const subs = firebase.auth()
            .onAuthStateChanged(user => {
                console.log(user)
                if (user) {
                    setIsAuth(true)
                }
            })
        return subs
    }, [navigation])


    if (isAuth) {
        return <Home navigation={navigation} setIsAuth={setIsAuth}/>
    } else {
        return <Login navigation={navigation} setIsAuth={setIsAuth}/>
    }
}

export default Loading