import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const NoteList = ({title, backgroundColor, id, description, noteList}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Single_Note', {
          singleNote: {
            title,
            id,
            description,
          },
          noteList,
        });
      }}>
      <View
        style={[styles.noteListWrapper, {backgroundColor: backgroundColor}]}>
        <Text style={styles.noteListTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteListWrapper: {
    padding: 30,
    borderRadius: 10,
    marginBottom: 25,
  },
  noteListTitle: {
    fontSize: 25,
    color: '#000',
  },
});

export default NoteList;
