import React, { useState } from 'react'
import { Text } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Icon, Button } from 'native-base'
import * as firebase from 'firebase'
import { firebaseConfig } from '../utils/helpers'


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const Profile = ({ route, navigation }) => {
    const user = firebase.auth().currentUser
    const [displayName, setdisplayName] = useState(user.displayName)
    const [email, setemail] = useState(user.email)
    const [password, setpassword] = useState("")


    const editName = (name) => {
        let user = firebase.auth().currentUser

        user.updateProfile({
            displayName: name,
        }).then(() => {
            alert("Update successful.")
        }).catch((error) => {
            alert("An error happened.", error)
        })
    }
    const editEmail = (email) => {
        let user = firebase.auth().currentUser

        user.updateEmail(email).then(() => {
            alert("Update successful.")
        }).catch((error) => {
            alert("An error happened.", error)
        })
    }
    const editPass = (pass) => {
        let user = firebase.auth().currentUser

        user.updatePassword(pass).then(() => {
            alert("Update successful.")
        }).catch((error) => {
            alert("An error happened.", error)
        })
    }

    const logout = () => {
        navigation.navigate('Logout')
    }

    return (
        <Container>
            <Content style={{ marginTop: 160 }}>
                <Form >
                    <Item inlineLabel>
                        <Label style={{ fontSize: 20, color: "gray" }}>Username</Label>
                        <Input style={{ fontSize: 20 }} value={displayName} onChangeText={(input) => setdisplayName(input)} />
                        <Button style={{ padding: 8, marginRight: 5 }} info rounded onPress={() => editName(displayName)}>
                            <Text style={{ color: "#fff", fontSize: 16 }}>Edit</Text>
                        </Button>
                    </Item>
                    <Item inlineLabel>
                        <Label style={{ fontSize: 20, color: "gray" }}>Email</Label>
                        <Input style={{ fontSize: 20 }} value={email} onChangeText={(input) => setemail(input)} />
                        <Button style={{ padding: 8, marginRight: 5 }} info rounded onPress={() => editEmail(email)}>
                            <Text style={{ color: "#fff", fontSize: 16 }}>Edit</Text>
                        </Button>
                    </Item>
                    <Item inlineLabel>
                        <Label style={{ fontSize: 20, color: "gray" }}>Password</Label>
                        <Input secureTextEntry={true} style={{ fontSize: 22 }} onChangeText={(input) => setpassword(input)} />
                        <Button style={{ padding: 8, marginRight: 5 }} info rounded onPress={() => editPass(password)}>
                            <Text style={{ color: "#fff", fontSize: 16 }}>Edit</Text>
                        </Button>
                    </Item>
                    <Button style={{ marginTop: 50 }} danger onPress={logout}>
                        <Text style={{ color: "#fff", fontSize: 16 }}>logout</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    )
}

export default Profile
