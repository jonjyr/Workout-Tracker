import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import ExerciseInput from './ExerciseInput';
import { init, saveExercise, fetchAllExercises, deleteExercise } from '../sqlconnection/db';

// Modal component for choosing or adding a new exercise from a list to App.js
const AddExercise = ({visible, onAddExercise, onCancel, showExerciseInputModal, setShowExerciseInputModal}) => {
  // State for the list of exercises
  const [exerciseList, setExerciseList] = useState([]);

  // useEffect hook to fetch exercises when the modal is opened
  useEffect(()=>{
    init();
    readExercises();
  },[]);

  // Async function for fetching all exercises from DB
  async function readExercises(){
    try{
      const dbResult = await fetchAllExercises();
      setExerciseList(dbResult);
    }
    catch (error) {
      console.error('Reading all exercises failed: ', error.message);
    }
  };

  // Async function for adding a new exercise from ExerciseInput.js to the DB and to the list of exercises 
  const inputExercise = async (exercise) => {
    try {
      await saveExerciseToDB(exercise); // FYI: Function to save exercise to DB called here
      const updatedList = await fetchAllExercises();
      setExerciseList(updatedList);
    } catch (error) {
      console.error('Error adding exercise:', error.message);
    } finally {
      setShowExerciseInputModal(false);
    }
  };

  // Async function for saving an added exercise to DB
  async function saveExerciseToDB(name) {
    try{
      const dbResult = await saveExercise(name);
      console.log("Saving exercise succeeded!");
    }
    catch (error) {
      console.error('Saving exercise failed: ', error.message);
    }
  };

  // Function for deleting an exercise from the list and from the DB with a long press (with confirmation)
  const deleteExerciseFromDB = (exercise) => {
    Alert.alert(
      "Delete Exercise",
      `Are you sure you want to delete the exercise '${exercise}' from the list?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK",
          // FYI: Async function for deleting exercise from DB here after pressing OK
          onPress: async () => {
            try {
              await deleteExercise(exercise);
              const updatedList = await fetchAllExercises();
              setExerciseList(updatedList);
            } catch (error) {
              console.error('Error deleting exercise:', error.message);
            }
          }
        }
      ],
      { cancelable: false }
    )
  };

  // Function for cancel button
  const cancelInputModal = () => {
    setShowExerciseInputModal(false);
  };

  return (
    <View style={styles.screen}>
      <Modal visible={visible}>
        <Text style={styles.heading}>Choose an exercise from the list below or add a new one</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <Button 
              title="Add New Exercise"
              onPress={() => setShowExerciseInputModal(true)}
            />         
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity 
              style={styles.cancelStyle}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listStyle}>
          <FlatList
            data={exerciseList}
            contentContainerStyle={{paddingBottom: 100}} // FYI: Add padding to the bottom of the list to make it wholly visible
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => 
              <TouchableOpacity 
                style={styles.listItem}
                onPress={() => onAddExercise(item.name)}
                onLongPress={() => deleteExerciseFromDB(item.name)}
              >
                <Text style={styles.textStyle}>{item.name}</Text>
              </TouchableOpacity>
            }
          />
        </View>
      </Modal>
      <ExerciseInput // FYI: Modal component ExerciseInput.js for inputting a new exercise called here
        visible={showExerciseInputModal} 
        onInputExercise={inputExercise}
        onInputCancel={cancelInputModal}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      paddingBottom: 100,
    },
    heading: {
      marginTop: 20,
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: 'skyblue',
      padding: 10,
    },
    buttonContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    buttonStyle: {
      width: '35%',
    },
    cancelStyle: {
      borderWidth: 1,
      padding: 7,
      borderColor: '#565656',
    },
    cancelText: {
      fontSize: 14,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      textAlign: 'center',
      color: '#565656',
    },
    listStyle: {
      marginTop: 20,
      flex: 1,
    },
    listItem: {
      width: '90%',
      borderWidth: 1,
      alignSelf: 'center',
      backgroundColor: '#D9F4F2',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderRadius: 10,
      padding: 2,
      margin: 3,
    },
    textStyle: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    deleteButton: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#FF6B6B',
    },
});

export default AddExercise;