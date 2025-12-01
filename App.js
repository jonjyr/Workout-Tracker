import { View, Text, Button, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AddExercise from './components/AddExercise';
import ChooseWorkout from './components/ChooseWorkout';
import { mainViewLogic } from './hooks/mainViewLogic';
import { mainStyles as styles } from './styles/mainStyles';

export default function App() {
  const { exercises, modals, toggleModal, handlers } = mainViewLogic();

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
                      renderRightActions={() => (
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
        onAddExercise={handlers.addExercise}
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