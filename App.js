import { View, Text, Button, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import AddExercise from './components/AddExercise';
import ChooseWorkout from './components/ChooseWorkout';
import { saveWorkout } from './sqlconnection/db';

export default function App() {
  // State for the list of exercises
  const [exercises, setExercises] = useState([]);

  // States for modal visibility
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const [showExerciseInputModal, setShowExerciseInputModal] = useState(false);
  const [showChooseWorkoutModal, setShowChooseWorkoutModal] = useState(false);

  // Function for adding a new exercise from AddExercise.js (with validation)
  const addExercise = (name) => {
    if (exercises.find(exercise => exercise.name.toLowerCase() === name.toLowerCase())) { // FYI: Validation to check if exercise already exists in the list
      alert('Exercise already exists');
      return;
    }
    const newExercise = {
      name,
      sets: []
    }
    setExercises(exercises => [...exercises, newExercise]);
    setShowAddExerciseModal(false);
    setShowExerciseInputModal(false);
  };

  // Function for adding a new set to an exercise in the list with 'Add set' button
  const addSet = (name) => {
    setExercises(exercises =>
      exercises.map(exercise => {
        if (exercise.name === name) {
          return {
            ...exercise,
            sets: [...exercise.sets, {weight: '', reps: ''}]
          };
        };
        return exercise;
      })
    );
  };

  // Function for updating the weight or reps of a set in the list when changing them in the TextInput
  const updateSets = (name, index, key, value) => {
    setExercises(exercises =>
      exercises.map(exercise => {
        if (exercise.name !== name) return exercise;
        const newSets = [...exercise.sets];
        newSets[index] = {...newSets[index], [key]: value};
        return {...exercise, sets: newSets};
      })
    );
  };

  // Function for deleting a whole exercise from the list after swiping left and pressing 'Delete'
  const deleteExercise = (name) => {
    setExercises(exercises => exercises.filter(exercise => exercise.name !== name));
  };

  // Function for deleting a set from an exercise in the list after swiping left and pressing 'Delete'
  const deleteSet = (name, index) => {
    setExercises(exercises =>
      exercises.map(exercise => {
        if (exercise.name !== name) return exercise;
        const newSets = [...exercise.sets];
        newSets.splice(index, 1);
        return {...exercise, sets: newSets};
      })
    );
  };

  // Function for importing a workout from ChooseWorkout.js
  const importWorkout = (workout) => {
    try {
      const importedExercises = workout.data;
      setExercises(importedExercises);
      setShowChooseWorkoutModal(false);
    } catch (error) {
      console.error('Error importing workout:', error.message);
    }
  }

  // Async function for saving a workout to the database after pressing 'Save Workout'
  const saveWorkoutToDB = async () => {
    try {
      const date = new Date().toISOString(); // FYI: Get current date for the workout
      await saveWorkout(exercises, date);
      alert('Workout saved successfully!');
      setExercises([]); // FYI: Clear the list of exercises after saving the workout
    } catch (error) {
      console.error('Error saving workout:', error.message);
    }
  }

  return ( 
    <View style={styles.screen}>
      <View style={styles.topButtonContainer}>
        <View style={styles.buttonStyle}>
          <Button 
            title="Import Workout"
            onPress={() => setShowChooseWorkoutModal(true)}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button 
            title="Save Workout"
            onPress={saveWorkoutToDB}
          />
        </View>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>🏋🏻 Awesome Workout Tracker 🏋🏻</Text>
      </View>
      <View style={styles.bottomButtonContainer}>
        <Button 
          title="Add Exercise"
          onPress={() => setShowAddExerciseModal(true)}
        />
      </View>
      <View style={styles.listStyle}>
        <FlatList
          data={exercises}
          contentContainerStyle={{paddingBottom: 100}} // FYI: Add padding to the bottom of the list to make it wholly visible
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) =>
            <Swipeable
              renderRightActions={() => ( // FYI: Swipeable component from react-native-gesture-handler to enable left swiping the list item to show delete button
                <TouchableOpacity onPress={() => deleteExercise(item.name)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              )}    
            >
              <View style={styles.listItem}>
                <View style={styles.listExercise}>
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <View style={styles.setButton}>
                    <Button 
                      title="Add set"
                      onPress={() => addSet(item.name)}
                    />
                  </View>
                </View>
                <View>
                  {item.sets.map((set, index) => (
                    <Swipeable
                      key={index}
                      renderRightActions={() => ( // FYI: Another Swipeable component to enable left swiping and deleting the individual sets 
                        <TouchableOpacity 
                          style={styles.deleteButton}
                          onPress={() => deleteSet(item.name, index)}
                        >
                          <Text>Delete</Text>
                        </TouchableOpacity>
                      )}
                    >
                      <View style={styles.setListItem}>
                        <Text style={styles.setNumber}>Set {index + 1}:</Text>
                        <View style={styles.setInputContainer}>
                          <Text>Weight: </Text>
                          <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={set.weight}
                            onChangeText={(text) => updateSets(item.name, index, 'weight', text)}
                          />
                        </View>
                        <View style={styles.setInputContainer}>
                          <Text>Reps: </Text>
                          <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={set.reps}
                            onChangeText={(text) => updateSets(item.name, index, 'reps', text)}
                          />
                        </View>
                      </View>
                    </Swipeable>
                  ))}
                </View>
              </View>
            </Swipeable>
          }
        />
      </View>
      <AddExercise // FYI: Modal component AddExercise.js for adding a new exercise
        visible={showAddExerciseModal}
        onAddExercise={addExercise}
        onCancel={() => setShowAddExerciseModal(false)}
        showExerciseInputModal={showExerciseInputModal}
        setShowExerciseInputModal={setShowExerciseInputModal}
      />
      <ChooseWorkout // FYI: Modal component ChooseWorkout.js for importing a saved workout
        visible={showChooseWorkoutModal}
        onImportWorkout={importWorkout}
        onImportCancel={() => setShowChooseWorkoutModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: 100,
    backgroundColor: '#F7F9FB',
  },
  topButtonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headingContainer: {
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'skyblue',
    padding: 10,
  },
  bottomButtonContainer: {
    marginTop: 20,
    width: '30%',
    alignSelf: 'center',
  },
  buttonStyle: {
    width: '35%',
  },
  listStyle: {
    marginTop: 20,
  },
  listItem: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
    padding: 5,
    marginBottom: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'white',
  },
  setButton: {
    width: '21%',
    margin: 2,
  },
  listExercise: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  setListItem: {
    width: '90%',
    height: 50,
    borderWidth: 0.75,
    borderRadius: 10,
    backgroundColor: '#D9F4F2',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 5,
    marginTop: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  setNumber: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  setInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 40,
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black',
  },
  deleteButton: {
    padding: 4,
    backgroundColor: '#FF6B6B',
    alignSelf: 'center',
    borderRadius: 5,
  },
});