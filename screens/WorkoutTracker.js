import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AddExercise from '../components/modals/AddExercise';
import ChooseWorkout from '../components/modals/ChooseWorkout';
import { useWorkoutTracker } from '../hooks/useWorkoutTracker';
import { mainStyles as styles } from '../styles/mainStyles';
import { colors } from '../styles/theme';
import { AppButton } from '../components/ui/AppButton';

const WorkoutTracker = () => {
  const { exercises, modals, toggleModal, handlers } = useWorkoutTracker();

  // Function to render the right actions for the Swipeable component
  const renderCardRightActions = (exerciseName) => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={() => handlers.deleteExercise(exerciseName)}
    >
      <Text style={styles.deleteText}>DELETE</Text>
    </TouchableOpacity>
  );

  const renderSetRightActions = (exerciseName, index) => (
    <TouchableOpacity
      style={styles.setDeleteAction}
      onPress={() => handlers.deleteSet(exerciseName, index)}
    >
      <Text style={[styles.deleteText, {fontSize: 12}]}>DEL</Text>
    </TouchableOpacity>
  );

  return ( 
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>🏋️ Workout Tracker 🏋️</Text>
        <View style={styles.actionBar}>
          <AppButton 
            onPress={() => toggleModal('chooseWorkout', true)}
            title="Add Workout"
            variant="primary"
            style={styles.actionButton}
          />
          <AppButton 
            onPress={handlers.saveWorkoutToDB}
            title="Finish & Save"
            variant="success"
            style={styles.actionButton}
          />
        </View>
      </View>
      
      <FlatList
        data={exercises}
        style={styles.listStyle}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Swipeable renderRightActions={() => renderCardRightActions(item.name)}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.exerciseTitle}>{item.name}</Text>
                <AppButton 
                  onPress={() => handlers.addSet(item.name)}
                  title="Add Set"
                  variant="secondary"
                  style={{paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8}}
                  textStyle={{fontSize: 12}}
                />
              </View>
              <View>
                {item.sets.map((set, index) => (
                  <Swipeable
                    key={`${item.name}-${index}`}
                    renderRightActions={() => renderSetRightActions(item.name, index)}
                  >
                    <View style={styles.setRow}>
                      <Text style={styles.setLabel}>Set {index + 1}:</Text>
                      <View style={styles.inputGroup}>
                        <View style={styles.inputWrapper}>
                          <Text style={styles.inputText}>weight</Text>
                          <TextInput
                            style={styles.inputField}
                            keyboardType="numeric"
                            placeholder="0"
                            placeholderTextColor={colors.border}
                            value={set.weight}
                            onChangeText={(text) => handlers.updateSets(item.name, index, 'weight', text)}
                          />
                        </View>
                        <View style={styles.inputWrapper}>
                          <Text style={styles.inputText}>reps</Text>
                          <TextInput
                            style={styles.inputField}
                            keyboardType="numeric"
                            placeholder="0"
                            placeholderTextColor={colors.border}
                            value={set.reps}
                            onChangeText={(text) => handlers.updateSets(item.name, index, 'reps', text)}
                          />
                        </View>
                      </View>
                    </View>
                  </Swipeable>
                ))}
              </View>
            </View>
          </Swipeable>
        )}
      />

      <View style={styles.fabContainer}>
        <AppButton 
          onPress={() => toggleModal('addExercise', true)}
          title="Add Exercise"
          variant="primary"
          style={styles.fabButton}
        />
      </View>

      <AddExercise
        visible={modals.addExercise}
        onAddExercise={handlers.addExercise}
        onCancel={() => toggleModal('addExercise', false)}
        showExerciseInputModal={modals.exerciseInput}
        setShowExerciseInputModal={(value) => toggleModal('exerciseInput', value)}
      />
      <ChooseWorkout
        visible={modals.chooseWorkout}
        onImportWorkout={handlers.importWorkout}
        onImportCancel={() => toggleModal('chooseWorkout', false)}
      />
    </View>
  );
};

export default WorkoutTracker;