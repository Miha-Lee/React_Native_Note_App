import React from 'react';
import {
  Modal,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Info from '../assets/info.png';

const ConfirmModal = ({
  confirmModalVisible,
  setConfirmModalVisible,
  goBackToSingleNote,
}) => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="fade"
      transparent
      visible={confirmModalVisible}
      onRequestClose={() => {
        setConfirmModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.infoImgWrapper}>
            <Image source={Info} style={styles.infoImg} />
          </View>
          <Text style={styles.infoText}>
            Are your sure you want discard your changes ?
          </Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={() => {
                if (goBackToSingleNote) {
                  goBackToSingleNote();
                } else {
                  navigation.navigate('Home');
                }
              }}>
              <View style={styles.discardButton}>
                <Text style={{color: '#fff', fontSize: 18}}>Discard</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setConfirmModalVisible(false);
              }}>
              <View style={styles.keepButton}>
                <Text style={{color: '#fff', fontSize: 18}}>Keep</Text>
              </View>
            </TouchableOpacity>
          </View>
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
  keepButton: {
    paddingHorizontal: 25,
    paddingVertical: 7,
    backgroundColor: '#30be71',
    borderRadius: 5,
  },
});

export default ConfirmModal;
