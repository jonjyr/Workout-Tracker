import { useState, useEffect } from 'react';
import { View, Text,  Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import { init, fetchAllWorkouts, deleteWorkout } from '../sqlconnection/db';
import { AppButton } from '../components/AppButton';
import { mainStyles as styles } from '../styles/mainStyles';

/**
 * Modal to view and import saved workouts
 * @param {Object} props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {function} props.onImportWorkout - Callback to load data from a saved workout
 * @param {function} props.onImportCancel - Callback for canceling the modal
 * @returns {JSX.Element} - Modal component
 */
const ChooseWorkout = ({visible, onImportWorkout, onImportCancel}) => {
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

  return (
    <Modal visible={visible} animationType='slide'>
      <View style={styles.modalScreen}>
        {/* Header and Cancel Button */}
        <Text style={styles.heading}>Saved Workouts</Text>
        <View style={styles.buttonContainer}>
          <AppButton 
            onPress={onImportCancel}
            title="Cancel"
            variant="cancel"
            style={styles.singleActionButton}
          />
        </View>
        {/* List of saved workouts */}
        <FlatList
          data={workoutList}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => 
            <TouchableOpacity
              style={styles.listItemCard}
              onPress={() => onImportWorkout(item)}
              onLongPress={() => confirmDeleteWorkout(item.id)}
            >
              <Text style={styles.listItemText}>Workout {item.index} - {item.date.split('T')[0]}</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </Modal>
  );
};

export default ChooseWorkout;