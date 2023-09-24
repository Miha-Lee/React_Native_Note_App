import React, {useState} from 'react';
import {
  Modal,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ConfirmModal from './ConfirmModal';
import Info from '../assets/info.png';

const SubmitModal = ({
  submitModalVisible,
  setSubmitModalVisible,
  onCreateSubmitModal,
}) => {
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={submitModalVisible}
        onRequestClose={() => {
          setSubmitModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.infoImgWrapper}>
              <Image source={Info} style={styles.infoImg} />
            </View>
            <Text style={styles.infoText}>Save changes ?</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                onPress={() => {
                  setSubmitModalVisible(false);
                  setConfirmModalVisible(true);
                }}>
                <View style={styles.discardButton}>
                  <Text style={{color: '#fff', fontSize: 18}}>Discard</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onCreateSubmitModal();
                }}>
                <View style={styles.saveButton}>
                  <Text style={{color: '#fff', fontSize: 18}}>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ConfirmModal
        confirmModalVisible={confirmModalVisible}
        setConfirmModalVisible={setConfirmModalVisible}
      />
    </>
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discardButton: {
    paddingLeft: 25,
    paddingRight: 26,
    paddingVertical: 7,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    marginRight: 35,
  },
  saveButton: {
    paddingHorizontal: 25,
    paddingVertical: 7,
    backgroundColor: '#30be71',
    borderRadius: 5,
  },
});

export default SubmitModal;
