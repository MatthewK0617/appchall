import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Calendar from './components/calendar/calendar';
// import CalendarH from './components/CalendarH/CalendarH';
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
      {page === "CalendarH" && 
        <CalendarH />
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
