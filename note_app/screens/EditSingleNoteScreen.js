import React, {useState, useMemo} from 'react';
import {
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import EditorValidationModal from '../components/EditorValidationModal';
import EditSubmitModal from '../components/EditSubmitModal';
import ConfirmModal from '../components/ConfirmModal';
import Back from '../assets/back.png';
import Save from '../assets/save.png';

const EditSingleNoteScreen = ({navigation, route}) => {
  const {singleNote, noteList} = route.params;
  const [titleEdit, setTitleEdit] = useState(singleNote.title);
  const [descriptionEdit, setDescriptionEdit] = useState(
    singleNote.description,
  );
  const [validationModalVisible, setValidationModalVisible] = useState(false);
  const [editSubmitModalVisible, setEditSubmitModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const onEditSubmitModal = () => {
    navigation.navigate('Single_Note', {
      singleNote: {
        id: singleNote.id,
        title: titleEdit,
        description: descriptionEdit,
      },
      noteList,
    });
  };

  const goBackToSingleNote = () => {
    navigation.navigate('Single_Note', {singleNote});
  };

  const stringCompareCheck = useMemo(() => {
    const {title, description} = singleNote;

    if (
      titleEdit.localeCompare(title) === 0 &&
      descriptionEdit.localeCompare(description) === 0
    ) {
      return true;
    } else {
      return false;
    }
  }, [titleEdit, descriptionEdit]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backSaveContainer}>
        <TouchableOpacity
          onPress={() => {
            if (!stringCompareCheck) {
              setConfirmModalVisible(true);
            } else {
              navigation.goBack();
            }
          }}>
          <View style={styles.backWrapper}>
            <Image source={Back} style={styles.backImg} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (!titleEdit || !descriptionEdit) {
              setValidationModalVisible(true);
            } else {
              setEditSubmitModalVisible(true);
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
        value={titleEdit}
        onChangeText={text => {
          setTitleEdit(text);
        }}
        style={styles.titleInput}
      />
      <TextInput
        placeholder="Type something..."
        placeholderTextColor="#9A9A9A"
        multiline
        value={descriptionEdit}
        onChangeText={text => {
          setDescriptionEdit(text);
        }}
        style={styles.descInput}
      />
      <EditorValidationModal
        validationModalVisible={validationModalVisible}
        setValidationModalVisible={setValidationModalVisible}
      />
      <EditSubmitModal
        editSubmitModalVisible={editSubmitModalVisible}
        setEditSubmitModalVisible={setEditSubmitModalVisible}
        goBackToSingleNote={goBackToSingleNote}
        onEditSubmitModal={onEditSubmitModal}
        stringCompareCheck={stringCompareCheck}
      />
      <ConfirmModal
        confirmModalVisible={confirmModalVisible}
        setConfirmModalVisible={setConfirmModalVisible}
        goBackToSingleNote={goBackToSingleNote}
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

export default EditSingleNoteScreen;
