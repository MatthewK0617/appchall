import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../../Constants';
import TodoListEntry from './todolist-entry';
import DraggableFlatList from 'react-native-draggable-flatlist';
import WriteForm from '../writeform/writeform';


const DATA = [
    {
        id: 0,
        title: "title",
        description: "desc",
        img: undefined,
        created: new Date().getTime(),
        completed: true,
        dueDate: new Date().getTime(),
        color: "skyblue",
        className: "Math",
        type: "homework", // eventually take in the corresponding boolean
        importance: 3
    },
    {
        id: 1,
        title: "title2",
        description: "desc",
        img: undefined,
        created: new Date().getTime(),
        completed: false,
        dueDate: new Date().getTime(),
        color: "skyblue",
        className: "Math",
        type: "homework", // eventually take in the corresponding boolean
        importance: 3
    }
]

export default function TodoList() {
    let [open, setOpen] = React.useState(true);
    let [entries, setEntries] = React.useState(DATA);

    function addEntry(entry) {
        console.log(entry);
        console.log(entries);
        setEntries([{ ...entry }, ...entries,])
    }

    function completeEntry(id) {
        let entries2 = [...entries];
        entries2.forEach(e => {
            if (e.id === id)
                e.completed = !e.completed;
        })
        setEntries(entries2);
    }
    return (
        <View style={styles.bg}>
            <View style={styles.container}>
                <Text style={styles.titletxt}>TodoList ({entries.length})</Text>
                <Content entries={entries} setEntries={setEntries} completeEntry={completeEntry} />
                <View style={styles.writeForm}>
                    <WriteForm addEntry={addEntry} />
                </View>
            </View>

        </View>
    );
}

function Content({ entries, setEntries, completeEntry }) {

    function renderItem({ item, index, move, moveEnd, isActive }) {

        return (
            <TouchableOpacity
                style={{
                    height: 100,
                    backgroundColor: isActive ? "blue" : item.color,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 5,
                }}
                onLongPress={move}
                onPressOut={moveEnd}
            >
                <TodoListEntry entry={item} setEntries={setEntries} completeEntry={completeEntry} />
            </TouchableOpacity>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <DraggableFlatList data={entries}
                renderItem={renderItem}
                keyExtractor={d => d.id}
                scrollPercent={0.001}
                onMoveEnd={({ data }) => setEntries(entries => {
                    return [...data];
                })} />
        </View>
    );
}



const styles = StyleSheet.create({
    bg: {
        backgroundColor: colors.blue1,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        marginBottom: 30,
    },
    titletxt: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        color: colors.blue2,
        fontWeight: 'bold',
        fontSize: 18,
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        marginTop: 20,
    },
    writeForm: {
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width,
        zIndex: 3,
    },
});
