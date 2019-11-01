import React from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Platform, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../Constants';
import { DayCell, Cell } from './cell';
import { getDate, getDaysInMonth, startOfDay, getMonth, getDay, format } from 'date-fns';
import TodoList from '../todolist/todolist';

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "t"]

export default function Calendar() {
    let [today, setToday] = React.useState(new Date());
    let firstDay = getFirstDay(startOfDay(new Date()));

    function getFirstDay(date) {
        let d = new Date(date);
        d.setDate(1);
        return d.getDay();
    }

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
                        <Ionicons name="md-checkbox" size={32} color={colors.blue5} />
                    </View>
                    <View style={styles.topRowRight}>
                        <Ionicons name="md-checkbox" size={32} color={colors.blue5} />
                        <Ionicons name="md-checkbox" size={32} color={colors.blue5} />
                    </View>
                </View>

                <View style={styles.mmyy}>
                    <Text style={styles.mmyytext}>{format(today, "MMMM")} {format(today, "do")}</Text>
                </View>

                <View style={styles.days}>
                    {DAYS.map((d, i) => (
                        <DayCell key={i} txt={d} />
                    ))}

                    {new Array(firstDay).fill(0).map((_, i) => (
                        <DayCell key={i} />
                    ))}

                    {new Array(getDaysInMonth(new Date())).fill(0).map((_, i) => (
                        <Cell
                            key={i}
                            txt={i + 1}
                            active={getDate(today) === i + 1}
                            date={i + 1}
                            setToday={setToday}
                        />
                    ))}

                    {new Array(7 - ((firstDay + getDaysInMonth(new Date())) % 7) === 28 ? 0 : (firstDay + getDaysInMonth(new Date()) % 7)).fill(0).map((_, i) => (
                        <DayCell key={i} />
                    ))}
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
    todoList: {
        height: (Dimensions.get('window').height - (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight)) * 0.6,
    },
    load: {},
});