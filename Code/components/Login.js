import React, { useState, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import * as firebase from 'firebase'
import { Container, Form, Input, Item, Button, Label } from 'native-base'
import { firebaseConfig } from '../utils/helpers'


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    signup = (email, password) => {
        console.log("SIGNUP")
        try {
            if (password.length < 6) {
                alert("Password should be more than 6 characters")
                return
            }

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    alert("Signed Up Successfully!")
                    setEmail("")
                    setPassword("")
                })
                .catch((err) => alert(err.toString()))

        } catch (err) {
            console.log(err.toString())
        }
    }

    login = (email, password) => {
        console.log("SIGNIN")
        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    navigation.navigate('Home')
                    setEmail("")
                    setPassword("")
                })
                .catch((err) => alert(err.toString()))

        } catch (err) {
            console.log(err.toString())
        }
    }

    return (
        <Container style={styles.container}>
            <Form>
                <Item fixedLabel>
                    <Label>Email</Label>
                    <Input autoCorrect={false} autoCapitalize='none' textContentType="emailAddress"
                        onChangeText={email => setEmail(email)}
                        value={email} />
                </Item>
                <Item fixedLabel>
                    <Label>Password</Label>
                    <Input secureTextEntry={true} autoCorrect={false} autoCapitalize='none' textContentType="password"
                        onChangeText={password => setPassword(password)}
                        value={password} />
                </Item>

                <Button rounded style={{ marginTop: 10 }} onPress={() => login(email, password)}>
                    <Text> Login </Text>
                </Button>

                <Button rounded style={{ marginTop: 10 }} onPress={() => signup(email, password)}>
                    <Text> Sign Up </Text>
                </Button>
            </Form>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10
    },
})

export default Login
