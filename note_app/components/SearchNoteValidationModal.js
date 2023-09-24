import React from 'react';
import {
  Modal,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Info from '../assets/info.png';

const SearchNoteValidationModal = ({
  searchNoteValidationModal,
  setSearchNoteValidationModal,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={searchNoteValidationModal}
      onRequestClose={() => {
        setSearchNoteValidationModal(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.infoImgWrapper}>
            <Image source={Info} style={styles.infoImg} />
          </View>
          <Text style={styles.infoText}>
            The note list is empty, please create a note and redirect to the
            search note page
          </Text>
          <TouchableOpacity
            onPress={() => {
              setSearchNoteValidationModal(false);
            }}>
            <View style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(196,196,196,0.5)',
  },
  modalView: {
    backgroundColor: '#252525',
    padding: 38,
    borderRadius: 10,
    maxWidth: 330,
  },
  infoImgWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoImg: {
    width: 36,
    height: 36,
  },
  infoText: {
    fontSize: 23,
    color: '#cfcfcf',
    textAlign: 'center',
    marginBottom: 24,
  },
  closeButton: {
    borderRadius: 10,
    backgroundColor: '#ff0000',
    paddingVertical: 7,
    paddingHorizontal: 37,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default SearchNoteValidationModal;
