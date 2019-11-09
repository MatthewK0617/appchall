import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Button,
    Picker,
    ScrollView,
    Platform,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-datepicker'
import { format, addDays } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../Constants';

export default function WriteForm({ addEntry }) {
    let [open, setOpen] = React.useState(true);

    return (
        <View style={styles.bg}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => setOpen(!open)}
                    style={styles.title}>
                    <Text style={styles.titletxt}>ADD</Text>
                </TouchableWithoutFeedback>
                {open && <Content addEntry={addEntry} />}
            </View>
        </View>
    );
}

const CLASSES = [
    { id: "Math", color: "skyblue", teacher: "Ms. Jones" },
    { id: "Science", color: "lightgreen", teacher: "Mr. Jones" },
    { id: "Social Studies", color: "lightpink", teacher: "Mrs. Jones" },
    { id: "English", color: "yellow", teacher: "Dr. Jones" },
    { id: "Extra Curricular", color: "lightgray", teacher: "None" }
]

const TYPES = [
    "Homework",
    "Project",
    "Study"
]

function Content({ addEntry }) {
    let [showPicker, setShowPicker] = React.useState(false);
    let [showClasses, setShowClasses] = React.useState(false);
    let today = new Date();
    let [title, setTitle] = React.useState("");
    let [desc, setDesc] = React.useState("");
    let [importance, setImportance] = React.useState(3);
    let [type, setType] = React.useState("Homework");
    let [c, setC] = React.useState(-1);
    let [dueDate, setDueDate] = React.useState(format(addDays(new Date(), 1), "MM/dd/yyyy"));
    let [image, setImage] = React.useState(undefined);

    return (
        <ScrollView style={styles.content}>
            <View style={styles.contentTopRow}>
                <TextInput style={styles.entersubject} value={title} onChangeText={newValue => setTitle(newValue)} style={styles.entersubject} placeholder="Enter Title" />
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    flexDirection: 'row', flexWrap: 'wrap'
                }}>
                    {CLASSES.map((cc, i) => (
                        <TouchableOpacity style={{
                            borderRadius: 3,
                            backgroundColor: i === c ? 'purple' : 'black', // check ****
                            padding: 4,
                            margin: 3,
                        }} key={i} onPress={() => { setC(i) }}><Text style={{
                            color: 'white',
                        }}>{cc.id}</Text></TouchableOpacity>))}
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
                <DatePicker style={{ width: 200, padding: 10 }}
                    date={dueDate}
                    mode="date"
                    placeholder="select date"
                    format="MM/DD/YYYY"
                    minDate="01-05-2018"
                    maxDate="02-06-2020"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => setDueDate(date)} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "flex-start" }}>
                    <Text>Importance: </Text>
                    {new Array(5).fill(0).map((v, i) => <TouchableOpacity style={{
                        backgroundColor: i === importance - 1 ? "white" : "", // problem, can select all at one time ******
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 3,
                        padding: 4,
                        margin: 3,
                        width: 30,
                    }} onPress={() => setImportance(i + 1)}><Text>{i + 1 + ""}</Text></TouchableOpacity>)}
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {TYPES.map(t => (
                    <Button title={t} onPress={() => setType(t)} color={t === type ? "white" : "black"} />
                ))}
            </View>
            <View style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end', width: Dimensions.get('window').width }}>

            <View style={styles.contentTopRow}>
                <TextInput style={styles.enterdescription}
                returnKeyType="done" multiline={true} value={desc} onChangeText={newValue => setDesc(newValue)} style={styles.entersubject} placeholder="Enter Description" />
            </View>

                {/****** NOT DOING WHAT IT IS SUPPOSED TO ******/}

                {c === "" && title === "" && <TouchableOpacity><Ionicons name="md-add" size={32} color={'white'} /></TouchableOpacity>}

                {c !== "" && title !== "" && <TouchableOpacity style={styles.iconCircle} onPress={() =>
                    addEntry({
                        id: title + new Date().getTime(),
                        title: title,
                        description: desc,
                        img: undefined,
                        created: format(new Date(), "MM/dd/yy"),
                        completed: false,
                        dueDate: dueDate,
                        color: CLASSES[c].color,
                        className: CLASSES[c].id,
                        type: type, // eventually take in the corresponding boolean
                        importance: importance
                    })
                }>
                    <Ionicons name="md-add" size={32} color={'white'} />
                </TouchableOpacity>}

                <View style={{
                    height: 30,
                }}></View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    bg: {
        backgroundColor: 'white',
    },
    container: {
        width: Dimensions.get('window').width,
        backgroundColor: colors.blue3,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        marginBottom: 30,
    },
    titletxt: {
        color: colors.blue2,
        fontWeight: 'bold',
        fontSize: 18,
    },
    content: {
        marginTop: 20,
        flexDirection: 'column'
    },
    contentTopRow: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    entersubject: {
        backgroundColor: colors.blue4,
        color: 'white',
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 20,
        fontSize: 20,
        flex: 1,
    },
    enterdescription: {
        backgroundColor: colors.blue4,
        color: 'white',
        height: 40,
        paddingHorizontal: 20,
        borderRadius: 20,
        fontSize: 20,
        flex: 1,
    },
    iconCircle: {
        backgroundColor: colors.blue4,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
    },
});
