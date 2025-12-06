import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { init, fetchAllWorkouts, deleteWorkout } from '../sqlconnection/db';
import { visible } from '../modals/ChooseWorkout';

/**
 * Custom hook for managing the state and logic for the Choose Workout modal
 * @returns {Object} - Object containing state and helper functions for the Choose Workout modal
 */
export const useChooseWorkout = () => {
  // --- State for the list of workouts ---
  const [workoutList, setWorkoutList] = useState([]);

  // --- Effect for fetching all workouts from DB when the modal is opened ---
  useEffect(() => {
    if (visible) {
      init();
      readWorkouts();
    }
  }, [visible]);

  // --- Data Helper Functions ---

  /**
   * Reads all saved workouts from the database and updates the workout list
   * @throws {Error} If reading fails
   */
  const readWorkouts = async () => {
    try {
      const dbResult = await fetchAllWorkouts();

      dbResult.forEach((workout, index) => {
        workout.index = index + 1;
      })
      setWorkoutList(dbResult);
    }
    catch (error) {
      console.log(`Error reading workouts: ${error.message}`);
      Alert.alert('Error', 'Failed to load saved workouts.');
    }
  };

  /**
   * Deletes a saved workout from the database
   * Confirmation alert before deleting
   * @param {number} id - The unique ID of the saved workout
   * @throws {Error} If deleting fails
   */
  const confirmDeleteWorkout = (id) => {
    Alert.alert(
      "Delete Workout",
      "Permanently delete this workout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteWorkout(id);
              readWorkouts();
            } 
            catch (error) {
              console.error(`Error deleting workout: ${error.message}`);
              Alert.alert('Error', 'Failed to delete workout.');
            }
          }
        }
      ]
    );
  };

  return { workoutList, readWorkouts, confirmDeleteWorkout };
}