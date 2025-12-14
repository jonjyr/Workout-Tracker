import { View, Text, Modal, FlatList, TouchableOpacity } from 'react-native';
import { AppButton } from '../components/AppButton';
import { mainStyles as styles } from '../styles/mainStyles';
import { useChooseWorkout } from '../hooks/useChooseWorkout';

/**
 * Modal to view and import saved workouts
 * @param {Object} props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {function} props.onImportWorkout - Callback to load data from a saved workout
 * @param {function} props.onImportCancel - Callback for canceling the modal
 * @returns {JSX.Element} - Modal component
 */
const ChooseWorkout = ({ visible, onImportWorkout, onImportCancel }) => {
  const { workoutList, confirmDeleteWorkout } = useChooseWorkout(visible);
  return (
    <Modal visible={visible} animationType="slide">
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
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItemCard}
              onPress={() => onImportWorkout(item)}
              onLongPress={() => confirmDeleteWorkout(item.id)}
            >
              <Text style={styles.listItemText}>
                Workout {item.index} - {item.date.split('T')[0]}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default ChooseWorkout;
