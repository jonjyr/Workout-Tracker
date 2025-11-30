import { View, Text, Button, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AddExercise from './components/AddExercise';
import ChooseWorkout from './components/ChooseWorkout';
import { useWorkoutLogic } from './hooks/UseWorkoutLogic';

export default function App() {
  const { exercises, modals, toggleModal, handlers } = useWorkoutLogic();

  return ( 
    <View style={styles.screen}>
      <View style={styles.topButtonContainer}>
        <View style={styles.buttonStyle}>
          <Button 
            title="Import Workout"
            onPress={() => toggleModal('chooseWorkout', true)}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button 
            title="Save Workout"
            onPress={handlers.saveWorkoutToDB}
          />
        </View>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>🏋🏻 Awesome Workout Tracker 🏋🏻</Text>
      </View>
      <View style={styles.bottomButtonContainer}>
        <Button 
          title="Add Exercise"
          onPress={() => toggleModal('addExercise', true)}
        />
      </View>
      <View style={styles.listStyle}>
        <FlatList
          data={exercises}
          contentContainerStyle={{paddingBottom: 100}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) =>
            <Swipeable
              renderRightActions={() => ( 
                <TouchableOpacity onPress={() => handlers.deleteExercise(item.name)}>
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
                      onPress={() => handlers.addSet(item.name)}
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
                          onPress={() => handlers.deleteSet(item.name, index)}
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
                            onChangeText={(text) => handlers.updateSets(item.name, index, 'weight', text)}
                          />
                        </View>
                        <View style={styles.setInputContainer}>
                          <Text>Reps: </Text>
                          <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={set.reps}
                            onChangeText={(text) => handlers.updateSets(item.name, index, 'reps', text)}
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
      <AddExercise
        visible={modals.addExercise}
        onAddExercise={handlersaddExercise}
        onCancel={() => toggleModal('addExercise', false)}
        showExerciseInputModal={modals}
        setShowExerciseInputModal={(value) => toggleModal('exerciseInput', value)}
      />
      <ChooseWorkout
        visible={modals.chooseWorkout}
        onImportWorkout={handlers.importWorkout}
        onImportCancel={() => toggleModal('chooseWorkout', false)}
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