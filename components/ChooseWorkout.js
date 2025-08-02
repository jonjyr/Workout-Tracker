import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Alert } from 'react-native';
import { init, fetchAllWorkouts, deleteWorkout } from '../sqlconnection/db';

const ChooseWorkout = ({visible, onImportWorkout, onImportCancel}) => {
  const [workoutList, setWorkoutList] = useState([]);

  useEffect(() => {
    if (visible) {
      init();
      readWorkouts();
    }
  }, [visible]);

  const confirmDeleteWorkout = (id) => {
    Alert.alert(
      "Delete Workout",
      "Are you sure you want to permanently delete this workout?",
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

  const deleteWorkoutFromDB = async (id) => {
    try {
      await deleteWorkout(id);
      console.log('Workout deleted successfully!');
      readWorkouts();
    } catch (error) {
      console.error('Error deleting workout:', error.message);
    }
  };

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
    <View style={styles.screen}>
      <Modal visible={visible}>
        <Text style={styles.heading}>
          Choose a previous workout from the list below
        </Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <TouchableOpacity 
              style={styles.cancelStyle}
              onPress={onImportCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.listStyle}>
          <FlatList
            data={workoutList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => 
              <TouchableOpacity 
                style={styles.listItem}
                onPress={() => onImportWorkout(item)}
                onLongPress={() => confirmDeleteWorkout(item.id)}
              >
                <Text style={styles.textStyle}>Workout {item.index}: {item.date.split('T')[0]}</Text>
              </TouchableOpacity>
            }
          />
        </View>
      </Modal>
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
      width: '20%',
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

export default ChooseWorkout;