import { useState, useEffect } from 'react';
import { View, Text,  Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import { init, fetchAllWorkouts, deleteWorkout } from '../sqlconnection/db';
import { AppButton } from './AppButton';
import { mainStyles as styles } from '../styles/mainStyles';

// Modal component for imporing a saved workout in App.js
const ChooseWorkout = ({visible, onImportWorkout, onImportCancel}) => {
  // State for the list of workouts
  const [workoutList, setWorkoutList] = useState([]);

  // useEffect hook to fetch workouts when the modal is opened
  useEffect(() => {
    if (visible) {
      init();
      readWorkouts();
    }
  }, [visible]);

  // Function for deleting a workout from the list with a long press (with confirmation)
  const confirmDeleteWorkout = (id) => {
    Alert.alert(
      "Delete Workout",
      "Permanently delete this workout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => deleteWorkoutFromDB(id)
        }
      ],
      { cancelable: false }
    )
  };

  // Function for deleting a workout from the database after it's deleted from the list
  const deleteWorkoutFromDB = async (id) => {
    try {
      await deleteWorkout(id);
      readWorkouts();
    } catch (error) {
      console.error('Error deleting workout:', error.message);
    }
  };

  // Async function for fetching all workouts and adding them to a list
  async function readWorkouts() {
    try{
      const dbResult = await fetchAllWorkouts();
      dbResult.forEach((workout, index) => {
        workout.index = index + 1;
      })
      setWorkoutList(dbResult);
    }
    catch (error) {
      console.log("Reading all workouts failed! " + error.message);
    }
  };

  return (
    <Modal visible={visible} animationType='slide'>
      <View style={styles.modalScreen}>  
        <Text style={styles.heading}>Choose Saved Workout</Text>
        <View style={styles.buttonContainer}>
          <AppButton 
            onPress={onImportCancel}
            title="Cancel"
            variant="cancel"
            style={styles.singleActionButton}
          />
        </View>
        <FlatList
          data={workoutList}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => 
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
  )
}

export default ChooseWorkout;