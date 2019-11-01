import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { colors } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import Modal from 'react-native-modal';
import Sbutton from '../common/sbutton';

function EditorScreen({ close, entry, setEntries }) {

    let [title, setTitle] = React.useState(entry.title);
    let [description, setDescription] = React.useState(entry.description);

    function onSubmit() {
        setEntries(entries => entries.map(en => (en.id === entry.id) ? { ...en, title } : en));
    }

    return (<View style={styles.fullPage} >
        <Text>editor</Text>
        <TextInput value={title} onChangeText={setTitle} />

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Sbutton color="dodgerblue" onPress={() => { onSubmit(); close(); }}>Update</Sbutton>
            <Sbutton onPress={close}>CLOSE</Sbutton>
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
            <View style={styles.textview}>
                <Text style={styles.text1}>{entry.title}</Text>
                <Text style={styles.text2}>{entry.type}</Text>
            </View>
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
    }
});
