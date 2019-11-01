import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { cstyles } from '../../Constants';

export default function Sbutton({ children, onPress, color = "#222b31" }) {
    return (<TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
        <Text style={styles.text}>{children}</Text></TouchableOpacity>)
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 4,
        marginHorizontal: 2
    },
    text: {
        color: 'white'
    }
});