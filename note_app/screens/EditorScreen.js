import React, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import EditorValidationModal from '../components/EditorValidationModal';
import SubmitModal from '../components/SubmitModal';
import Back from '../assets/back.png';
import Save from '../assets/save.png';

const EditorScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validationModalVisible, setValidationModalVisible] = useState(false);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);

  const onCreateSubmitModal = () => {
    navigation.navigate('Home', {
      titleDesc: {
        title,
        description,
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backSaveContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View style={styles.backWrapper}>
            <Image source={Back} style={styles.backImg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!title || !description) {
              setValidationModalVisible(true);
            } else {
              setSubmitModalVisible(true);
            }
          }}>
          <View style={styles.saveWrapper}>
            <Image source={Save} style={styles.saveImg} />
          </View>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Title"
        placeholderTextColor="#9A9A9A"
        multiline
        maxLength={60}
        onChangeText={text => {
          setTitle(text);
        }}
        style={styles.titleInput}
      />
      <TextInput
        placeholder="Type something..."
        placeholderTextColor="#9A9A9A"
        multiline
        onChangeText={text => {
          setDescription(text);
        }}
        style={styles.descInput}
      />
      <EditorValidationModal
        validationModalVisible={validationModalVisible}
        setValidationModalVisible={setValidationModalVisible}
      />
      <SubmitModal
        submitModalVisible={submitModalVisible}
        setSubmitModalVisible={setSubmitModalVisible}
        onCreateSubmitModal={onCreateSubmitModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    paddingLeft: 24,
    paddingRight: 25,
  },
  backSaveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 51,
    alignItems: 'center',
  },
  backWrapper: {
    backgroundColor: '#3b3b3b',
    borderRadius: 15,
    paddingHorizontal: 18.83,
    paddingVertical: 13.83,
  },
  saveWrapper: {
    backgroundColor: '#3b3b3b',
    padding: 13,
    borderRadius: 15,
  },
  backImg: {
    width: 13.17,
    height: 22.35,
  },
  saveImg: {
    width: 24,
    height: 24,
  },
  titleInput: {
    fontSize: 48,
    color: '#fff',
    marginTop: 40,
  },
  descInput: {
    fontSize: 23,
    color: '#fff',
    marginTop: 37,
  },
});

export default EditorScreen;
