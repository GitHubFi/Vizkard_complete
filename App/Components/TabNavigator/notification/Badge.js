import { View, StyleSheet, Text } from "react-native";
import React from "react";

const styles = StyleSheet.flatten({
    circle: {
        width: 16,
        height: 16,
        borderRadius: 18,  //half radius will make it cirlce,
        backgroundColor: 'red',
        // position: 'absolute'
        justifyContent: 'center',
        alignContent: 'center',
        // padding: 'auto',
        paddingTop:10,
        textAlign: 'center',
    },
    count: {
        color: '#fff',
        margin: 'auto',
        textAlign: 'center',
    }
})
const Badge = ({ count }) => (
    <View style={styles.circle}>
        <Text style={styles.count}>{count}</Text>
    </View>
);

export default Badge;