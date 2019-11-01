import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { colors } from '../../Constants';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import Modal from 'react-native-modal';
import Sbutton from '../common/sbutton';

function EditorScreen({ close, entry, setEntries }) {

    let [title, setTitle] = React.useState(entry.title);

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
            <Ionicons name="md-checkbox" size={20} color={colors.blue3} />
            <View style={styles.textview}>
                <Text style={styles.text}>{entry.title}</Text>
                <Text style={styles.text}>{entry.type}</Text>
            </View>
            <CheckBox
                style={{ flex: 1, padding: 10, }}
                onClick={() => completeEntry(entry.id)}
                isChecked={entry.completed}
            />
            <Button title="show editor" onPress={() => setShowEditor(true)} />
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
    },
    textview: {
        flex: 1, marginHorizontal: 10
    },
    text: {
        color: colors.blue3,
        fontSize: 20,
        fontWeight: 'bold'
    },
    fullPage: {
        position: 'absolute',
        top: 100, left: 0, bottom: 100, right: 0,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 10
    }
});
