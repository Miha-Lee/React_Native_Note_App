import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DeleteModal from '../components/DeleteModal';
import Back from '../assets/back.png';
import Edit from '../assets/edit.png';
import Delete from '../assets/delete.png';

const SingleNoteScreen = ({navigation, route}) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const {singleNote, noteList} = route.params;
  const routes = navigation.getState()?.routes;
  const prevRoute = routes[routes.length - 2];

  const onDeleteModal = () => {
    if (prevRoute.name === 'Home') {
      navigation.navigate('Home', {
        deleteId: singleNote.id,
      });
    } else if (prevRoute.name === 'Search_Note') {
      navigation.navigate('Search_Note', {
        deleteId: singleNote.id,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backDeleteEditContainer}>
        <TouchableOpacity
          onPress={() => {
            if (prevRoute.name === 'Home') {
              navigation.navigate('Home', {
                singleNote,
              });
            } else if (prevRoute.name === 'Search_Note') {
              navigation.navigate('Search_Note', {
                singleNote,
                noteList,
              });
            }
          }}>
          <View style={styles.backWrapper}>
            <Image source={Back} style={styles.backImg} />
          </View>
        </TouchableOpacity>
        <View style={styles.deleteEditWrapper}>
          <TouchableOpacity
            onPress={() => {
              setDeleteModalVisible(true);
            }}>
            <View style={styles.deleteWrapper}>
              <Image source={Delete} style={styles.deleteImg} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Edit_Single_Note', {
                singleNote,
                noteList,
              });
            }}>
            <View style={styles.editWrapper}>
              <Image source={Edit} style={styles.editImg} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>{singleNote.title}</Text>
      <Text style={styles.description}>{singleNote.description}</Text>
      <DeleteModal
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        onDeleteModal={onDeleteModal}
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
  backDeleteEditContainer: {
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
  editWrapper: {
    paddingHorizontal: 11,
    paddingVertical: 12,
    backgroundColor: '#3b3b3b',
    borderRadius: 15,
    marginLeft: 21,
  },
  deleteWrapper: {
    paddingHorizontal: 11,
    paddingVertical: 12,
    backgroundColor: '#3b3b3b',
    borderRadius: 15,
  },
  deleteEditWrapper: {
    flexDirection: 'row',
  },
  backImg: {
    width: 13.17,
    height: 22.35,
  },
  editImg: {
    width: 27,
    height: 27,
  },
  deleteImg: {
    width: 27,
    height: 27,
  },
  title: {
    fontSize: 48,
    color: '#fff',
    marginTop: 41,
  },
  description: {
    fontSize: 23,
    color: '#fff',
    marginTop: 37,
  },
});

export default SingleNoteScreen;
