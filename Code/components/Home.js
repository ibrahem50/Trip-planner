import React, { useEffect, useState } from 'react'
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'
import * as firebase from 'firebase'

import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from "react-native"

const Home = ({ navigation, route }) => {
    const [data, setData] = useState([])
    const [text, setText] = useState('')

    navigation.setOptions({
        title: 'Trip Manager',
        headerLeft: () => (
            <FontAwesome style={{ marginLeft: 14 }} name='user' size={40} color={'black'} onPress={() => {
                navigation.navigate('Profile')
            }} />
        ),
    })

    const userId = firebase.auth().currentUser.uid;

    useEffect(() => {
        console.log("useEffect")
        firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
            setData(snapshot.val().data || [])
            console.log("data", data)

        });
    }, [text])

    const addDestinstion = (dest) => {
        firebase.database().ref('users/' + userId).set({
            data: [...data, dest]
        });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Enter Your Destination</Text>
            <View style={styles.flexRow}>
                <TextInput
                    onChangeText={text => setText(text)}
                    onSubmitEditing={() => {
                        addDestinstion(text);
                        setText('')
                    }}
                    placeholder="Destination"
                    style={styles.input}
                    value={text}
                />
            </View>
            <ScrollView style={styles.listArea}>
                {
                    data.length > 0
                        ? data.map((dest, key) => (
                            <View key={key} style={styles.sectionContainer}>
                                <TouchableOpacity style={styles.employee} onPress={() => { navigation.navigate('Country', { dest }) }}>
                                    <Text style={styles.text}>{dest}</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                        : <View style={styles.sectionContainer}>
                            <Text style={{ textAlign: "center" }}>Nothing To Show</Text>
                        </View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    flexRow: {
        flexDirection: "row"
    },
    input: {
        borderColor: "#4630eb",
        borderRadius: 4,
        borderWidth: 1,
        flex: 1,
        height: 48,
        margin: 16,
        padding: 8
    },
    listArea: {
        backgroundColor: "#f0f0f0",
        flex: 1,
        paddingTop: 16
    },
    sectionContainer: {
        marginBottom: 16,
        marginHorizontal: 16
    },
    sectionHeading: {
        fontSize: 18,
        marginBottom: 8
    },
    text: {
        textAlign: "center",
        fontSize: 22,
        color: 'white'
    },
    employee: {
        backgroundColor: 'purple',
        paddingTop: 15,
        paddingBottom: 15,
    }
});

export default Home
