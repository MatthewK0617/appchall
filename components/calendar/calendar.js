import React from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Platform, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../Constants';
import { DayCell, Cell } from './cell';
import { setDate, getDate, getDaysInMonth, startOfDay, format, addMonths, addDays } from 'date-fns';
import TodoList from '../todolist/todolist';


const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({ setPage }) {
    let [selectDay, setSelectDay] = React.useState(new Date());

    let today = startOfDay(setDate(new Date(), 1));
    let firstDay = today;

    let today2 = setDate(addMonths(today, 1), 1);
    let firstDay2 = today2;

    React.useEffect(() => {
        async function load() {
            let time = await AsyncStorage.getItem(
                'tlist-' + format(today, 'MM/YYYY')
            );
            if (time === null) {
                AsyncStorage.setItem(
                    'tlist-' + format(today, 'MM/YYYY'),
                    JSON.stringify([])
                );
            }

            let tlist = await AsyncStorage.getItem('');
        }
        load();
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.calendar}>
                <View style={styles.topRow}>
                    <View>
                        <TouchableOpacity onPress={() => setPage("Front Page")}>
                            <Image source={require("../../assets/images/icon_chevron_left.png")} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.mmyy}>
                    <Text style={styles.mmyytext}>{format(today, "MMMM")} </Text>
                </View>

                <View style={styles.days}>
                    {DAYS.map((d, i) => (
                        <DayCell key={i} txt={d} />
                    ))}

                    {new Array(today.getDay()).fill(0).map((_, i) => (
                        <DayCell key={i} />
                    ))}

                    {new Array(getDaysInMonth(new Date())).fill(0).map((_, i) => (
                        <Cell
                            key={i}
                            txt={i + 1}
                            active={getDate(selectDay) === i + 1}
                            selectDay={selectDay}
                            date={addDays(today, i)}
                            setToday={setSelectDay}
                        />
                    ))}

                    {
                        new Array(7 - (getDaysInMonth(today) + today.getDay()) % 7).fill(0).map((_, i) => <DayCell key={i} />)
                    }

                </View>

                {/* --- second month --- */}
                <View style={styles.mmyy}>
                    <Text style={styles.mmyytext}>{format(today2, "MMMM")}</Text>
                </View>

                <View style={styles.days}>
                    {DAYS.map((d, i) => (
                        <DayCell key={i} txt={d} />
                    ))}

                    {new Array(today2.getDay()).fill(0).map((_, i) => (
                        <DayCell key={i} />
                    ))}

                    {new Array(getDaysInMonth(today2)).fill(0).map((_, i) => (
                        <Cell
                            key={i}
                            txt={i + 1}
                            selectDay={selectDay}
                            date={addDays(today2, i)}
                            setToday={setSelectDay}
                        />
                    ))}

                    {
                        new Array(7 - (getDaysInMonth(today2) + today2.getDay()) % 7).fill(0).map((_, i) => <DayCell key={i} />)
                    }


                </View>
            </View>
            <View style={styles.todoList}>
                <TodoList today={today} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        backgroundColor: colors.blue1,
        height: Dimensions.get('window').height
    },
    calendar: {
        padding: 10,
        flex: 1,
        height: (Dimensions.get('window').height - (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight)) * 0.3,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topRowRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 80,
    },
    mmyy: {
        alignItems: 'center',
    },
    mmyytext: {
        color: colors.blue5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    days: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    load: {},
});