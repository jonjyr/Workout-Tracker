import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { init, fetchAllExercises, saveExercise, deleteExercise } from '../sqlconnection/db';

/**
 * Custom hook managing the state and logic for the Add Exercise modal
 * Handles exercise list management, input modal visibility and database persistence
 * @returns {Object} - An object containing the exercise list, input modal visibility and related functions
 */
export const useAddExercise = () => {
  // --- State Management ---

  const [exerciseList, setExerciseList] = useState([]);
  const [inputModalVisible, setInputModalVisible] = useState(false);

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
   * Validates if the exercise name already exists in the database
   * Calls the inputExercise function if the name is unique to create a new exercise
   * @param {string} name - The name of the exercise
   */
  const validateInput = async (name) => {
    const existingExercise = exerciseList.find(exercise => exercise.name.toLowerCase() === name.toLowerCase());
    if (existingExercise) {
      Alert.alert('Duplicate Exercise', 'Exercise already exists.');
      return;
    }
    inputExercise(name);
  };

  /**
   * Creates a new exercise in the database
   * Updates the exercise list
   * @param {string} name - The name of the exercise
   * @throws {Error} If creating fails
   */
  const inputExercise = async (name) => {
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
      setInputModalVisible(false);
    }
  };

  /**
   * Prompts the user to confirm exercise deletion
   * Calls the removeExercise function if confirmed to delete the exercise from the database
   * @param {string} name - Name of the exercise
   */
  const validateDelete = (name) => {
    Alert.alert(
      "Delete Exercise",
      `Permanently delete '${name}'?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "OK",
          style: "destructive",
          onPress: () => removeExercise()
        }
      ],
    );
  };

  /**
   * Removes an exercise from the database
   * Updates the exercise list
   * @param {string} name - Name of the exercise
   * @throws {Error} If removing fails
   */
  const removeExercise = async (name) => {
    try {
      await deleteExercise(name);
      readExercises();
    } 
    catch (error) {
      console.error(`Error deleting exercise: ${error.message}`);
    }
  };

  return { 
    exerciseList,
    validateInput,
    validateDelete,
    removeExercise,
    inputExercise,
    inputModalVisible,
    setInputModalVisible
  };
};