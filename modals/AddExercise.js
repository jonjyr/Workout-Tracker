import { useState, useEffect } from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import ExerciseInput from './ExerciseInput';
import { init, saveExercise, fetchAllExercises, deleteExercise } from '../sqlconnection/db';
import { AppButton } from '../components/AppButton';
import { mainStyles as styles } from '../styles/mainStyles';

/**
 * Modal used to select an exercise to add to a workout or to create a new exercise
 * @param {Object} props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {function} props.onAddExercise - Parent handler to add a selected exercise to a workout
 * @param {function} props.onCancel - Parent handler to close the modal
 * @param {boolean} props.showExerciseInputModal - Visibility state for the nested input modal
 * @param {function} props.setShowExerciseInputModal - Setter for the nested input modal visibility
 * @returns {JSX.Element} - Modal component
 */
const AddExercise = ({
    visible,
    onAddExercise,
    onCancel,
    showExerciseInputModal,
    setShowExerciseInputModal
  }) => {
    // --- State for Exercise List ---
    const [exerciseList, setExerciseList] = useState([]);

    // --- Effect for fetching all exercises from DB ---
    useEffect(()=>{
      init();
      readExercises();
    },[]);

    // --- Data Helper Functions ---

    /**
     * Reads all exercises from the database and updates the exercise list
     * @throws {Error} If reading fails
     */
    async function readExercises(){
      try{
        const dbResult = await fetchAllExercises();

        setExerciseList(dbResult);
      }
      catch (error) {
        console.error(`Error reading exercises: ${error.message}`);
        Alert.alert('Error', 'Failed to load exercises.');
      }
    };

    /**
     * Saves a new inputted exercise to the database
     * Alerts the user if the exercise already exists
     * @param {string} name - The name of the exercise
     * @throws {Error} If saving fails
     */
    const inputExercise = async (name) => {
      const existingExercise = exerciseList.find(exercise => exercise.name.toLowerCase() === name.toLowerCase());
      if (existingExercise) {
        Alert.alert('Duplicate Exercise', 'Exercise already exists.');
        return;
      }
      try {
        await saveExercise(name);
        const updatedList = await fetchAllExercises();

        setExerciseList(updatedList);
      } 
      catch (error) {
        console.error('Error creating exercise:', error.message);
        Alert.alert('Error', 'Failed to create exercise.');
      } 
      finally {
        setShowExerciseInputModal(false);
      }
    };

    /**
     * Deletes an exercise from the database
     * @param {string} name - Name of the exercise
     * @throws {Error} If deleting fails
     */
    const deleteExerciseFromDB = (name) => {
      Alert.alert(
        "Delete Exercise",
        `Permanently delete '${name}'?`,
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "OK",
            style: "destructive",
            onPress: async () => {
              try {
                await deleteExercise(name);
                readExercises();
              } 
              catch (error) {
                console.error(`Error deleting exercise: ${error.message}`);
              }
            }
          }
        ],
      );
    };

    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalScreen}>
          {/* --- Header & Action Bar --- */}
          <Text style={styles.heading}>Select or Create Exercise</Text>
          <Text style={styles.subHeading}>(long press to delete)</Text>
          <View style={styles.actionBar}>
            <AppButton 
              onPress={() => setShowExerciseInputModal(true)}
              title="Create New Exercise"
              style={styles.actionButton}
              variant="primary"
            />
            <AppButton
                onPress={onCancel}
                title="Cancel"
                style={styles.actionButton}
                variant="cancel"
              />
          </View>
          {/* --- Exercise List --- */}
          <FlatList
            data={exerciseList}
            contentContainerStyle={styles.listContent}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => 
              <TouchableOpacity 
                style={styles.listItemCard}
                onPress={() => onAddExercise(item.name)}
                onLongPress={() => deleteExerciseFromDB(item.name)}
              >
                <Text style={styles.listItemText}>{item.name}</Text>
              </TouchableOpacity>
            }
            />
          {/* --- Input Modal --- */}
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