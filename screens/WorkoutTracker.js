import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AddExercise from '../modals/AddExercise';
import ChooseWorkout from '../modals/ChooseWorkout';
import { useWorkoutTracker } from '../hooks/useWorkoutTracker';
import { mainStyles as styles } from '../styles/mainStyles';
import { colors } from '../styles/theme';
import { AppButton } from '../components/AppButton';

/**
 * Main screen of the application
 * Coordinates user interactions with the @useWorkoutTracker logic hook
 * @returns {JSX.Element} - Main screen component
 */
const WorkoutTracker = () => {
  const { exercises, modals, toggleModal, handlers } = useWorkoutTracker();

  // --- Render Functions ---

  /**
   * Renders deletion action when swiping an exercise card
   * @param {string} exerciseName - The name of the exercise to delete
   */
  const renderCardRightActions = (exerciseName) => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={() => handlers.deleteExercise(exerciseName)}
    >
      <Text style={styles.deleteText}>DELETE</Text>
    </TouchableOpacity>
  );

  /**
   * Renders deletion action when swiping a specific set row
   * @param {string} exerciseName
   * @param {number} index
   */
  const renderSetRightActions = (exerciseName, index) => (
    <TouchableOpacity
      style={styles.setDeleteAction}
      onPress={() => handlers.deleteSet(exerciseName, index)}
    >
      <Text style={[styles.deleteText, { fontSize: 12 }]}>DEL</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      {/* --- Header & Action Bar --- */}
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>🏋️ Workout Tracker 🏋️</Text>
        <View style={styles.actionBar}>
          <AppButton
            onPress={() => toggleModal('chooseWorkout', true)}
            title="Workouts"
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
      {/* --- Main Exercise List --- */}
      <FlatList
        data={exercises}
        style={styles.listStyle}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => renderCardRightActions(item.name)}
          >
            {/* --- Exercise Card --- */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.exerciseTitle}>{item.name}</Text>
                <AppButton
                  onPress={() => handlers.addSet(item.name)}
                  title="Add Set"
                  variant="secondary"
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                  }}
                  textStyle={{ fontSize: 12 }}
                />
              </View>
              {/* --- Set List --- */}
              <View>
                {item.sets.map((set, index) => (
                  <Swipeable
                    key={`${item.name}-${index}`}
                    renderRightActions={() =>
                      renderSetRightActions(item.name, index)
                    }
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
                            onChangeText={(text) =>
                              handlers.updateSets(
                                item.name,
                                index,
                                'weight',
                                text,
                              )
                            }
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
                            onChangeText={(text) =>
                              handlers.updateSets(
                                item.name,
                                index,
                                'reps',
                                text,
                              )
                            }
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
      {/* --- Floating Action Button --- */}
      <View style={styles.fabContainer}>
        <AppButton
          onPress={() => toggleModal('addExercise', true)}
          title="Add Exercise"
          variant="primary"
          style={styles.fabButton}
        />
      </View>
      {/* --- Modals --- */}
      <AddExercise
        visible={modals.addExercise}
        onAddExercise={handlers.addExercise}
        onCancel={() => toggleModal('addExercise', false)}
        showExerciseInputModal={modals.exerciseInput}
        setShowExerciseInputModal={(value) =>
          toggleModal('exerciseInput', value)
        }
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
