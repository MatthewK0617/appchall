import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { colors } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import Modal from 'react-native-modal';
import Sbutton from '../common/sbutton';
import DatePicker from 'react-native-datepicker';

function EditorScreen({ close, entry, setEntries }) {

    let [title, setTitle] = React.useState("");
    let [description, setDescription] = React.useState(entry.description);
    let [dueDate, setDueDate] = React.useState(entry.dueDate);
    let [steps, setSteps] = React.useState(["Essay Body Paragraph 1", "Essay Body Paragraph 2", "Essay Conclusion"]);


    function onSubmit() {
        title = title === "" ? entry.title : title
        setEntries(entries => entries.map(en => (en.id === entry.id) ? { ...en, title, description, dueDate } : en));
    }

    return (<View style={styles.fullPage} >
        <TextInput style={{
            fontSize: 24,
            padding: 5,
            margin: 5,
        }} placeholder={title} placeholderTextColor={'black'}
        value={title} onChangeText={setTitle} />
        <View
            style={{
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1,
            }}
        />
        <TextInput style={{
            fontSize: 18,
            padding: 5,
            margin: 5,
        }} value={description} onChangeText={setDescription} />
        <DatePicker style={{ width: 200, alignSelf: 'center' }}
            date={dueDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2018-05-01"
            maxDate="2020-06-01"
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
        {steps.map((s, i) => (
            <View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ paddingLeft: 5, paddingRight: 5, fontSize: 20 }}>{i + 1}.</Text>
                    <TextInput style={{ fontSize: 15, paddingBottom: 5 }} value={s} onChangeText={(newValue) => setSteps(steps => steps.map((step, ind) => ind === i ? newValue : step))} />
                </View>
                <View
                    style={{
                        borderTopColor: 'lightgray',
                        borderTopWidth: 1,
                        marginBottom: 5,
                    }}
                />
            </View>
        ))}
        <TouchableOpacity style={{
            flexDirection: "row",
            alignItems: "center",
        }} onPress={() => { }}>
            <Ionicons style={{
                color: colors.blue3
            }} name="ios-add-circle" size={30} />
            <Text style={{
                fontSize: 20,
                color: colors.blue3
            }}>  Add Step</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
            alignSelf: 'center',
            backgroundColor: colors.blue4,
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 50,
        }}>
            <Text style={{ fontSize: 20, color: 'white' }}>Select Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
            alignSelf: 'center',
            backgroundColor: colors.blue3,
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 50,
            margin: 5
        }}>
            <Text style={{ fontSize: 20, color: 'white' }}>Take Picture</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
            <TouchableOpacity style={{
                alignSelf: 'center',
                backgroundColor: colors.blue1,
                borderRadius: 20,
                paddingVertical: 5,
                paddingHorizontal: 30
            }} onPress={() => { onSubmit(); close(); }}>
                <Text style={{ fontSize: 20, color: 'white' }}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                alignSelf: 'center',
                backgroundColor: colors.gray1,
                borderRadius: 20,
                paddingVertical: 5,
                paddingHorizontal: 30
            }} onPress={close}>
                <Text style={{ fontSize: 20, color: 'white' }}>close</Text>
            </TouchableOpacity>

        </View>
    </View>)
}

export default function TodoListEntry({ entry, setEntries, completeEntry, today }) {

    let [showEditor, setShowEditor] = React.useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShowEditor(true)}>
                <Ionicons name="md-menu" size={30} color={colors.blue3} />
            </TouchableOpacity>
            {entry.completed ? <View style={styles.textview}>
                <Text style={styles.completed}>{entry.title}</Text>
                <Text style={styles.text2}>{entry.type}</Text>
            </View> : <View style={styles.textview}>
                    <Text style={styles.text1}>{entry.title}</Text>
                    <Text style={styles.text2}>{entry.type}</Text>
                </View>}
            <Text style={styles.text3}>{entry.description}</Text>
            <CheckBox
                style={{ flex: 1, alignItems: 'flex-end' }}
                onClick={() => completeEntry(entry.id)}
                isChecked={entry.completed}
            />

            <Modal
                isVisible={showEditor}
                style={{ marginTop: 100 }}
            >
                <EditorScreen entry={entry} setEntries={setEntries} close={() => setShowEditor(false)} />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    textview: {
        flex: 1, marginHorizontal: 10
    },
    text1: {
        color: colors.blue3,
        fontSize: 18,
        fontWeight: 'bold'
    },
    completed: {
        color: colors.blue3,
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'line-through',
        textDecorationColor: 'red',
    },
    text2: {
        color: colors.blue3,
        fontSize: 12,
    },
    text3: {
        color: colors.blue3,
        fontSize: 12,
    },
    fullPage: {
        position: 'absolute',
        top: 100, left: 0, bottom: 100, right: 0,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 10,
    },
});
