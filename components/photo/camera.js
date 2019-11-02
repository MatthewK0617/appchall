import * as React from 'react';
import {
  Alert,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { format } from 'date-fns';
import { AsyncStorage } from 'react-native';
import { Card } from 'react-native-paper';

function Camera({ img, today, result, updateImage, subjectKey}) {

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      let a = await Permissions.askAsync(Permissions.CAMERA);
      let b = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  };

  const _pickImage = async () => {

    await getPermissionAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
        updateImage(subjectKey, result.uri);
    }
  };

  React.useEffect(() => {
    _pickImage();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 0,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={_pickImage}
      /> 
    </ScrollView>
  );
}

export default Camera;
