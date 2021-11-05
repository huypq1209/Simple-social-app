import React, { useState, useEffect } from 'react'
import { StyleSheet, Platform, Image, Text, TextInput, View, Button } from 'react-native'
import firebase from '../Utilities/firebaseDb'



const SignUp = props => {

    const { navigation, route:{params: {setIsAuth}}} = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(null)

    const handleSignUp = () => {
        firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => navigation.navigate('Home'))
                .catch(error => setErr(error.message))
    }

    return (
        <View>
            <TextInput 
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                secureTextEntry
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
            />
            <Button title='Sign Up' onPress={handleSignUp}/>
            {
                err && <Text style={{color: 'red', fontSize: 30}}>{err}</Text>
            }
        
        </View>
    )

}

export default SignUp