import React from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DATA = [
    { id: "Math", color: "skyblue" },
    { id: "Science", color: "lightgreen" },
    { id: "Social Studies", color: "lightpink" },
    { id: "English", color: "yellow" },
    { id: "Extra Curricular", color: "lightgray" }
]

const COLORS = [
    "skyblue",
    "lightgreen",
    "lightpink",
    "yellow",
    "lightgray",
]

export default function FrontPage({ setPage }) {
    let [classes, setClasses] = React.useState(DATA);
    let [addClass, setAddClass] = React.useState(false);
    let [id, setId] = React.useState("");
    let [color, setColor] = React.useState(COLORS[0]);
    // let [teacher, setTeacher] = React.useState("");

    let onTextSubmit = (newClass) => {
        setClasses([...classes, newClass]);
        setId('');
    }

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 50,
                color: 'white',
            }}>Classes</Text>
            <View style={{
                height: 50,
            }}></View>
            {addClass && <View style={styles.addClass}>
                <TextInput value={id} onChangeText={newValue => setId(newValue)} placeholder="class name" style={styles.text} onTextSubmit={onTextSubmit} />
                {/* <TextInput value={teacher} onChangeText={newValue => setTeacher(newValue)} placeholder="teacher name" style={styles.text} /> */}
                <Button title="add class" onPress={() => setClasses([...classes, { id: id, color: color, }])} />
                <Button title="close" onPress={() => setAddClass(false)} />

            </View>}
            {classes.map(c => (
                <View key={c} style={{ padding: 15, margin: 5, borderTopColor: c.color, borderTopWidth: 4, backgroundColor: '#020B0E', flexDirection: 'row', width: Dimensions.get('window').width * .94, alignItems: "center", justifyContent: "center" }}>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 30,
                        }}>{c.id}</Text>
                    <TouchableOpacity onPress={() => setClasses(classes.filter(v => v.id !== c.id))}>
                        <Ionicons name="md-trash" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            ))}
            <View style={styles.btns}>
                <Button onPress={() => setAddClass(true)} style={styles.btn} title="Add Class" />
                <Button style={styles.btn} onPress={() => setPage("Calendar")} title="Next" />
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        backgroundColor: '#020B0E',
    },
    btns: {
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        padding: '10px'
    },
    addClass: {
        width: Dimensions.get('window').width,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        margin: 5,
        backgroundColor: 'white',
        width: Dimensions.get('window').width * 0.5,
        height: 20,
        borderRadius: 5
    }
});
