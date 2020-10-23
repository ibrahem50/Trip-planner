import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { countriesAPI } from '../utils/helpers'
import { Notifications } from 'expo'

const Country = ({ navigation, route }) => {
    const country = route.params.dest

    useEffect(() => {
        const now = new Date()
    console.log("date", now)
    now.setSeconds(now.getSeconds() + 5)
    Notifications.scheduleLocalNotificationAsync({
        title: "Hello",
        body: "Don't forget your trip",
        ios: {
            sound: true
        },
        android: {
            color: "blue",
            sticky: false,
        }
    }, {
        time: now
    })
    }, [])

    const [lat, setlat] = useState(0)
    const [lng, setlng] = useState(0)

    useEffect(() => {
        countriesAPI(country)
            .then(({ geometry }) => {
                setlat(geometry.lat)
                setlng(geometry.lng)
            })
            .catch(err => alert("Error Occured, Rsestart the app."))
    }, [country])


    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 25,
                        longitudeDelta: 25,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: lat,
                            longitude: lng,
                            latitudeDelta: 25,
                            longitudeDelta: 25,
                        }}
                    />
                </MapView>
                {
                    <View style={styles.textcontainer}>
                        <Text style={styles.country}> {country}</Text>
                    </View>

                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        padding: 10
    },
    textcontainer: {
        flex: 1,

    },
    scroll: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: 400,
        height: 390,
    },
    country: {
        fontSize: 20,
        fontWeight: "700",
        margin: 5,
        alignSelf: "center"
    },
    content: {
        paddingBottom: 5,
        paddingTop: 5,
        fontSize: 22
    }
})

export default Country
