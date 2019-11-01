import React from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TextInput } from 'react-native';

const DATA = [
    { id: "Math", color: "skyblue", teacher: "Ms. Jones" },
    { id: "Science", color: "lightgreen", teacher: "Mr. Jones" },
    { id: "Social Studies", color: "lightpink", teacher: "Mrs. Jones" },
    { id: "English", color: "yellow", teacher: "Dr. Jones" },
    { id: "Extra Curricular", color: "lightgray", teacher: "None" }
]

const COLORS = [
    "skyblue",
    "lightgreen",
    "lightpink",
    "yellow",
    "lightgray",
]

export default function FrontPage({setPage}) {
    let [classes, setClasses] = React.useState(DATA);
    let [addClass, setAddClass] = React.useState(false);
    let [id, setId] = React.useState("");
    let [color, setColor] = React.useState(COLORS[0]);
    let [teacher, setTeacher] = React.useState("");
    
    return (
        <View style={styles.container}>
            {addClass && <View style={styles.addClass}>
                <TextInput value={id} onChangeText={newValue => setId(newValue)} placeholder="class name" style={styles.text} />
                <TextInput value={teacher} onChangeText={newValue => setTeacher(newValue)} placeholder="teacher name" style={styles.text} />
                <Button title="add class" onPress={() => setClasses([...classes, { id: id, color: color, teacher: teacher }])} />
                <Button title="close" onPress={() => setAddClass(false)} />

            </View>}
            {classes.map(c => (
                <View key={c} style={{ backgroundColor: c.color }}>
                    <Text>{c.id}{c.teacher !== "None" ? "-" + c.teacher : ""}</Text>
                    <Button title="Delete" onPress={() => setClasses(classes.filter(v => v.id !== c.id))}/>
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
        height: Dimensions.get('window').height
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
