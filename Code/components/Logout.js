import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import * as firebase from 'firebase'

const Logout = ({ navigation }) => {
    useEffect(() => {
        firebase.auth().signOut()
            .then(navigation.navigate('Login'))
            .catch((err) => alert(err.toString()))

    }, [])
    return (
        <View>
            <Text>LOGGING OUT</Text>
        </View>
    )
}


export default Logout
