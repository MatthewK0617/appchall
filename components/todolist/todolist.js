import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import { colors } from '../../Constants';
import TodoListEntry from './todolist-entry';
import DraggableFlatList from 'react-native-draggable-flatlist';
import WriteForm from '../writeform/writeform';
import { differenceInCalendarDays, format, isEqual, getDate } from 'date-fns';

const DATA = [
    {
        id: 1,
        title: "title",
        description: "desc",
        img: undefined,
        created: 11/2/19,
        dueDate: 11/4/19,
        color: "skyblue",
        className: "Math",
        type: "homework", // eventually take in the corresponding boolean
        importance: 3,
        steps: [
            'body para 1',
            'body para 1',
        ],
        // imgs: [
        //     '.pjpg', 'ppng'
        // ],
        // completed: [true, true, false],
        // completed2: false
    }
]

export default function TodoList({ today }) {
    let [open, setOpen] = React.useState(true);
    let [entries, setEntries] = React.useState(DATA);

    function addEntry(entry) {
        console.log(entry);
        setEntries([{ ...entry }, ...entries])
    }

    function deleteEntry(entry) { // check **********
        let entries2 = [...entries];
        entries2.filter(v => v.id !== entry.id);
        setEntries(entries2);
        if (entries2.length === 0) {
            AsyncStorage.setItem('entries', '[]');
        }
    }

    function completeEntry(id) {
        let entries2 = [...entries];
        entries2.forEach(e => {
            if (e.id === id)
                e.completed = !e.completed;
        })
        setEntries(entries2);
    }

    /* **********************End of Entries************************** */

    let updateImage = (id, uri) => {
        let entries2 = [...entries];
        entries2.forEach(e => {
            if (e.id === id) {
                e.img = uri;
            }
        });
        setImg(uri);
        setEntries(entries2);
    };

    React.useEffect(() => {
        async function load() {
            let data = await AsyncStorage.getItem('entries');
            if (!data) setEntries(DATA);
            else setEntries([JSON.parse(data)]);
        }
        load();
    }, []);

    React.useEffect(() => {
        if (entries.length > 0) {
            AsyncStorage.setItem('entries', JSON.stringify(entries));
        }
    }, [entries]);


    return (
        <View style={styles.bg}>
            <View style={styles.container}>
                <Text style={styles.titletxt}>TodoList ({entries.length})</Text>
                <Content today={today} entries={entries} setEntries={setEntries} completeEntry={completeEntry} />
                <View style={styles.writeForm}>
                    <WriteForm addEntry={addEntry} />
                </View>
            </View>

        </View>
    );
}

function Content({ entries, today, setEntries, completeEntry }) {

    function renderItem({ item, index, move, moveEnd, isActive }) {

        return (
            <View>
                <View style={{
                    height: 4,
                }}></View>

                <TouchableOpacity
                    style={{
                        margin: 1,
                        height: 100,
                        backgroundColor: isActive ? 'azure' : 'white',
                        shadowColor: isActive ? 'black' : 'white',
                        shadowOpacity: 1,
                        shadowOffset: { width: 0, height: 2 },
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                        marginRight: 10,
                        borderTopWidth: 3,
                        borderTopColor: item.color,
                    }}
                    onLongPress={move}
                    onPressOut={moveEnd}
                >
                    <TodoListEntry removeSubject={removeSubject} today={today} entry={item} setEntries={setEntries} completeEntry={completeEntry} />
                </TouchableOpacity>
            </View>
        );
    }

    const todaysEntries = entries.filter(
        e => (today >= new Date(e.created) && today <= new Date(e.dueDate))
    );

    /***** if I make <DraggableFlatList data={todaysEntries}, nothing shows  *****/

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                    height: 4,
                }}></View>
            <DraggableFlatList data={todaysEntries}
                renderItem={renderItem}
                keyExtractor={d => d.id}
                scrollPercent={0.001}
                onMoveEnd={({ data }) => {
                    setEntries(data);
                }} />
                <View style={{
                    height: 55
                }}></View>
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
