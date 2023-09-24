import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Text,
  Dimensions,
  Keyboard,
  StyleSheet,
} from 'react-native';
import NoteList from '../components/NoteList';
import Back from '../assets/back.png';
import Close from '../assets/close.png';
import notFound from '../assets/notFound.png';

const SearchNoteScreen = ({navigation, route}) => {
  const [keyword, setKeyword] = useState('');
  const {singleNote, deleteId} = route.params;
  const [noteList, setNoteList] = useState(route.params.noteList);
  const [landscape, setLandscape] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const determineAndSetOrientation = () => {
    let width = Dimensions.get('window').width;
    let height = Dimensions.get('window').height;

    if (width > height) {
      setLandscape(true);
    } else {
      setLandscape(false);
    }
  };

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
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (singleNote) {
      const updateNote = noteList.map(nl => {
        if (nl.id === singleNote.id) {
          return {
            ...nl,
            title: singleNote.title,
            description: singleNote.description,
          };
        } else {
          return {...nl};
        }
      });

      setNoteList(updateNote);
    }
  }, [singleNote]);

  useEffect(() => {
    if (deleteId) {
      const deleteNote = noteList.filter(nl => nl.id !== deleteId);

      setNoteList(deleteNote);
    }
  }, [deleteId]);

  const searchNoteByKeyword = useMemo(() => {
    if (keyword.length > 0) {
      return noteList.filter(
        nl =>
          nl.description.toLowerCase().includes(keyword) ||
          nl.title.toLowerCase().includes(keyword),
      );
    } else {
      return [];
    }
  }, [noteList, keyword]);

  return (
    <>
      {landscape ? (
        <ScrollView style={styles.container}>
          <View style={styles.backContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={styles.backWrapper}>
                <Image source={Back} style={styles.backImg} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.searchCloseContainer}>
            <TextInput
              placeholder="Search by the keyword..."
              placeholderTextColor="#ccc"
              value={keyword}
              onChangeText={text => {
                setKeyword(text);
              }}
              style={styles.searchBar}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setKeyword('');
              }}>
              <Image source={Close} style={styles.closeImg} />
            </TouchableOpacity>
          </View>
          {searchNoteByKeyword.length === 0 ? (
            <View style={styles.notFoundWrapper}>
              <Image source={notFound} style={styles.notFoundImage} />
              <Text style={styles.notFoundText}>Please search the note.</Text>
            </View>
          ) : (
            <FlatList
              data={searchNoteByKeyword}
              ListHeaderComponent={() => {
                return <View style={{marginTop: 37}}></View>;
              }}
              renderItem={({item}) => {
                return <NoteList {...item} noteList={noteList} />;
              }}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <View style={styles.backContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={styles.backWrapper}>
                <Image source={Back} style={styles.backImg} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.searchCloseContainer}>
            <TextInput
              placeholder="Search by the keyword..."
              placeholderTextColor="#ccc"
              value={keyword}
              onChangeText={text => {
                setKeyword(text);
              }}
              style={styles.searchBar}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setKeyword('');
              }}>
              <Image source={Close} style={styles.closeImg} />
            </TouchableOpacity>
          </View>
          {searchNoteByKeyword.length === 0 ? (
            <>
              {!isKeyboardVisible && (
                <View style={styles.notFoundWrapper}>
                  <Image source={notFound} style={styles.notFoundImage} />
                  <Text style={styles.notFoundText}>
                    Please search the note.
                  </Text>
                </View>
              )}
            </>
          ) : (
            <FlatList
              data={searchNoteByKeyword}
              ListHeaderComponent={() => {
                return <View style={{marginTop: 37}}></View>;
              }}
              renderItem={({item}) => {
                return <NoteList {...item} noteList={noteList} />;
              }}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
    paddingHorizontal: 27,
  },
  backContainer: {
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
  backImg: {
    width: 13.17,
    height: 22.35,
  },
  searchBar: {
    color: '#ccc',
    fontSize: 20,
    backgroundColor: '#3b3b3b',
    borderRadius: 50,
    paddingLeft: 38,
    paddingTop: 11,
    paddingBottom: 12,
    paddingRight: 63,
    marginTop: 40,
  },
  closeButton: {
    position: 'absolute',
    top: '60%',
    right: '5%',
  },
  closeImg: {
    width: 24,
    height: 24,
  },
  searchCloseContainer: {
    position: 'relative',
  },
  notFoundWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundImage: {
    width: 370,
    height: 239.1,
  },
  notFoundText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 4.9,
    textAlign: 'center',
  },
});

export default SearchNoteScreen;
