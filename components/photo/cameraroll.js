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

function CameraRoll({
  img,
  today,
  result,
  updateImage,
  subjectKey,
  setImagePicked,
}) {
  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      let a = await Permissions.askAsync(Permissions.CAMERA);
      let b = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  };
  
  const _pickImage = async () => {
    await getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      updateImage(subjectKey, result.uri);
      // setImagePicked(true);
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
    <></>
  );
}

export default CameraRoll;
