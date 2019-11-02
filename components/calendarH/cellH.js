import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../../Constants';
import {setDate} from 'date-fns';

function DayCellH({ txt }) {
  return (
    <View style={styles.cell}>
      <Text style={[styles.color1, styles.txt1]}>{txt}</Text>
    </View>
  );
}

function CellH({ txt, date, active, setToday }) {
  return (
    <TouchableOpacity style={styles.cell} onPress={()=>setToday(today => setDate(today, date))}>
      <Text style={[(active ? styles.coloractive : styles.color2), styles.txt2]}>{txt}</Text>
      {active && <View style={styles.circle} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: (Dimensions.get('window').width - 40) / 7,
    flexGrow: 1,
    height: 40,
  },
  color1: {
    color: colors.blue3,
  },
  color2: {
    color: colors.blue5,
  },
  coloractive: {
    color: colors.blue1
  },
  txt1: {
    fontSize: 10,
  },
  txt2: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  circle: {
    position: 'absolute',
    backgroundColor: colors.blue5,
    width: 25,
    height: 25,
    borderRadius: 12.5,
    zIndex: -1,
    top: -4,
    left: -5.5
  },
});

export { CellH, DayCellH };
