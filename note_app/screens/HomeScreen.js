import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import NoteList from '../components/NoteList';
import SearchNoteValidationModal from '../components/SearchNoteValidationModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../utils/colors';
import Search from '../assets/search.png';
import Note from '../assets/note.png';
import Plus from '../assets/plus.png';

const HomeScreen = ({navigation, route}) => {
  const [noteList, setNoteList] = useState([]);
  const [searchNoteValidationModal, setSearchNoteValidationModal] =
    useState(false);
  const [landscape, setLandscape] = useState(false);
  const routeObj = route.params;

  const determineAndSetOrientation = () => {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;

    if (width > height) {
      setLandscape(true);
    } else {
      setLandscape(false);
    }
  };

  const saveNoteListToUserDevice = async noteList => {
    try {
      const stringifyNoteList = JSON.stringify(noteList);
      await AsyncStorage.setItem('noteList', stringifyNoteList);
    } catch (error) {
      console.log(error);
    }
  };

  const getNoteListFromUserDevice = async () => {
    try {
      const noteLists = await AsyncStorage.getItem('noteList');

      if (noteLists != null) {
        setNoteList(JSON.parse(noteLists));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNoteListFromUserDevice();
  }, []);

  useEffect(() => {
    saveNoteListToUserDevice(noteList);
  }, [noteList]);

  useEffect(() => {
    determineAndSetOrientation();
    const listener = Dimensions.addEventListener(
      'change',
      determineAndSetOrientation,
    );

    return () => {
      listener.remove();
    };
  }, []);

  useEffect(() => {
    if (routeObj) {
      if (routeObj.titleDesc) {
        setNoteList([
          ...noteList,
          {
            id: Date.now(),
            title: routeObj.titleDesc.title,
            description: routeObj.titleDesc.description,
            backgroundColor:
              noteList.length === 0
                ? colors[0]
                : colors[
                    colors.indexOf(
                      noteList[noteList.length - 1].backgroundColor,
                    ) + 1
                  ],
          },
        ]);
      } else if (routeObj.deleteId) {
        const deleteNote = noteList.filter(nl => nl.id !== routeObj.deleteId);

        setNoteList(deleteNote);
      } else if (routeObj.singleNote) {
        const updateNote = noteList.map(nl => {
          if (nl.id === routeObj.singleNote.id) {
            return {
              ...nl,
              title: routeObj.singleNote.title,
              description: routeObj.singleNote.description,
            };
          } else {
            return {...nl};
          }
        });

        setNoteList(updateNote);
      }

      route.params = undefined;
    }
  }, [routeObj]);

  return (
    <>
      <View style={styles.container}>
        {noteList.length === 0 ? (
          <>
            <View style={styles.noteContainer}>
              <Text style={styles.title}>Notes</Text>
              <TouchableOpacity
                onPress={() => {
                  if (noteList.length === 0) {
                    setSearchNoteValidationModal(true);
                  } else {
                    navigation.navigate('Search_Note');
                  }
                }}>
                <View style={styles.searchImgWrapper}>
                  <Image source={Search} style={styles.searchImg} />
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={[styles.noteWrapper, {marginBottom: landscape ? 50 : 0}]}>
              <Image source={Note} style={styles.noteImg} />
              <Text style={styles.noteText}>Create your first note!</Text>
            </View>
          </>
        ) : (
          <FlatList
            data={noteList}
            ListHeaderComponent={() => {
              return (
                <View style={[styles.noteContainer, {marginBottom: 37}]}>
                  <Text style={styles.title}>Notes</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (noteList.length === 0) {
                        setSearchNoteValidationModal(true);
                      } else {
                        navigation.navigate('Search_Note', {noteList});
                      }
                    }}>
                    <View style={styles.searchImgWrapper}>
                      <Image source={Search} style={styles.searchImg} />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            renderItem={({item}) => {
              return <NoteList {...item} />;
            }}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Editor');
          }}>
          <View style={styles.plusWrapper}>
            <Image source={Plus} style={styles.plusImg} />
          </View>
        </TouchableOpacity>
      </View>
      <SearchNoteValidationModal
        searchNoteValidationModal={searchNoteValidationModal}
        setSearchNoteValidationModal={setSearchNoteValidationModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    paddingLeft: 24,
    paddingRight: 25,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 47,
    alignItems: 'flex-end',
  },
  title: {
    color: '#fff',
    fontSize: 43,
  },
  searchImgWrapper: {
    backgroundColor: '#3b3b3b',
    padding: 13,
    borderRadius: 15,
  },
  searchImg: {
    width: 24,
    height: 24,
  },
  noteWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteImg: {
    width: 350,
    height: 286.73,
  },
  noteText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginTop: 6.27,
  },
  plusWrapper: {
    backgroundColor: '#252525',
    borderRadius: 50,
    position: 'absolute',
    right: 35,
    bottom: 49,
    padding: 11,
    elevation: 2,
    zIndex: 50,
  },
  plusImg: {
    width: 48,
    height: 48,
  },
});

export default HomeScreen;
