import { useState, useEffect } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import ExerciseInput from './ExerciseInput';
import { init, saveExercise, fetchAllExercises, deleteExercise } from '../sqlconnection/db';
import { AppButton } from '../components/ui/AppButton';
import { mainStyles as styles } from '../styles/mainStyles';

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
      await saveExerciseToDB(exercise);
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
    }
    catch (error) {
      console.error('Saving exercise failed: ', error.message);
    }
  };

  // Function for deleting an exercise from the list and from the DB with a long press (with confirmation)
  const deleteExerciseFromDB = (exercise) => {
    Alert.alert(
      "Delete Exercise",
      `Are you sure you want to delete the exercise '${exercise}'?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK",
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

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalScreen}>
        <Text style={styles.heading}>Select or Create Exercise</Text>
        <Text style={styles.subHeading}>(long press to delete)</Text>
        <View style={styles.actionBar}>
          <AppButton 
            onPress={() => setShowExerciseInputModal(true)}
            title="Create New Exercise"
            style={styles.actionButton}
            textStyle={styles.textStyle}
            variant="primary"
          />
          <AppButton 
              style={styles.actionButton}
              title="Cancel"
              onPress={onCancel}
              variant="cancel"
            />
        </View>
        <FlatList
          data={exerciseList}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => 
            <TouchableOpacity 
              style={styles.listItemCard}
              onPress={() => onAddExercise(item.name)}
              onLongPress={() => deleteExerciseFromDB(item.name)}
            >
              <Text style={styles.listItemText}>{item.name}</Text>
            </TouchableOpacity>
          }
          />
        <ExerciseInput
          visible={showExerciseInputModal} 
          onInputExercise={inputExercise}
          onInputCancel={() => setShowExerciseInputModal(false)}
        />
      </View>
    </Modal>
  )
}

export default AddExercise;