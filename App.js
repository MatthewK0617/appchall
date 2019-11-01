import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from './components/calendar/calendar';
import FrontPage from './components/front-page/front-page';


export default function App() {
  let [page, setPage] = React.useState("Front Page")

  return (
    <View>
      {page === "Front Page" &&
        <FrontPage setPage={setPage}/>}
      {page === "Calendar" && 
        <Calendar />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
