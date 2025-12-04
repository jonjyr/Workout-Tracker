import { useState } from 'react';
import { Alert } from 'react-native';
import { saveWorkout } from '../sqlconnection/db';

/**
 * Custom hook managing the state and logic for the main Workout Tracker view
 * Handles exercise list management, modal toggling and database persistence
 * @returns {Object} - An object containing the current exercise list, modal state and related functions
 */
export const useWorkoutTracker = () => {

  // --- State Initialization ---

  const [exercises, setExercises] = useState([]);
  const [modals, setModals] = useState({
    addExercise: false,
    exerciseInput: false,
    chooseWorkout: false
  });

  // --- Modal Handling ---

  const toggleModal = (modalName, value) => {
    setModals(prevModals => ({ ... prevModals, [modalName]: value }));
  };

  // --- Exercise Management Logic ---

  /**
   * Adds a new exercise to the list
   * Checks for duplicates (case-insensitive)
   * Closes the related modals
   * @param {string} name - The name of the exercise to add
   */
  const addExercise = (name) => {
    if (exercises.find((exercise) => exercise.name.toLowerCase() === name.toLowerCase())) {
      Alert.alert('Duplicate','Exercise already exists.');
      return;
    };

    const newExercise = {
      name,
      sets: []
    };

    setExercises(prevExercises => [...prevExercises, newExercise]);

    toggleModal('addExercise', false);
    toggleModal('exerciseInput', false);
  };

  /**
   * Removes an exercise from the list
   * @param {string} name - The name of the exercise to delete
   */
  const deleteExercise = (name) => {
    setExercises(prevExercises => prevExercises.filter(exercise => exercise.name !== name));
  };

  // --- Set Management Logic ---

  /**
   * Adds an empty set to a specific exercise
   * @param {string} exerciseName - The name of the exercise
   */
  const addSet = (exerciseName) => {
    setExercises (prevExercises => prevExercises.map (exercise => {
      if (exercise.name === exerciseName) {
        return {
          ...exercise,
          sets: [...exercise.sets, {weight: '', reps: ''}]
        };
      }

      return exercise;
    }));
  };

  /**
   * Updates a spcific field (weight or reps) in a specific set
   * @param {string} exerciseName - The name of the exercise
   * @param {number} index - The index of the set
   * @param {string} key - The field to update (weight or reps)
   * @param {string} value - The new value
   */
  const updateSets = (exerciseName, index, key, value) => {
    setExercises(prevExercises => prevExercises.map(exercise => {
      if (exercise.name !== exerciseName) return exercise;

      const newSets = [...exercise.sets];
      newSets[index] = { ...newSets[index], [key]: value };

      return { ...exercise, sets: newSets };
    }));
  };

  /**
   * Removes a specific set from an exercise
   * @param {string} exerciseName - The name of the exercise
   * @param {number} index - The index of the set to remove
   */
  const deleteSet = (exerciseName, index) => {
    setExercises(prevExercises => prevExercises.map(exercise => {
      if (exercise.name !== exerciseName) return exercise;

      const newSets = [...exercise.sets];

      newSets.splice(index, 1);

      return { ...exercise, sets: newSets };
    }));
  };

  // --- Workout Save & Import Logic ---

  /**
   * Replaces current exercise list state with imported data from a saved workout
   * @param {Object} workout - The workout object containing 'data' field array
   * @throws {Error} If importing fails
   */
  const importWorkout = (workout) => {
    try {
      setExercises(workout.data);
      toggleModal('chooseWorkout', false);
    } catch (error) {
      console.error(`Error importing workout: ${error.message}`);
      Alert.alert('Error', 'Failed to import workout data.');
    }
  };

  /**
   * Saves the current exercise list to the database
   * Alerts the user if there are no exercises
   * Alerts the user on successful save
   * Clears the exercise list upon success
   * @throws {Error} If saving fails
   */
  const saveWorkoutToDB = async () => {
    if (exercises.length === 0) {
      Alert.alert('Empty Workout', 'No exercises to save.');
      return;
    }

    try {
      const date = new Date().toISOString();
      
      await saveWorkout(exercises, date);
      Alert.alert('Success', 'Workout saved successfully!');
      setExercises([]);
    }
    catch (error) {
      console.error(`Error saving workout: ${error.message}`);
      Alert.alert('Error', 'Failed to save workout.');
    }
  };

  return {
    exercises,
    modals,
    toggleModal,
    handlers: {
      addExercise,
      addSet,
      updateSets,
      deleteExercise,
      deleteSet,
      importWorkout,
      saveWorkoutToDB
    }
  };
};