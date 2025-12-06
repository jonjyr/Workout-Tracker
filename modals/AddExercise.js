import { View, Text, Modal, FlatList, TouchableOpacity } from 'react-native';
import ExerciseInput from './ExerciseInput';
import { AppButton } from '../components/AppButton';
import { mainStyles as styles } from '../styles/mainStyles';
import { useAddExercise } from '../hooks/useAddExercise';

/**
 * Modal used to select an exercise to add to a workout or to create a new exercise
 * @param {Object} props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {function} props.onAddExercise - Parent handler to add a selected exercise to a workout
 * @param {function} props.onCancel - Parent handler to close the modal
 * @returns {JSX.Element} - Modal component
 */
const AddExercise = ({ visible, onAddExercise, onCancel }) => {
  const { exerciseList, validateInput, validateDelete, inputModalVisible, setInputModalVisible } = useAddExercise();
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalScreen}>
        {/* --- Header & Action Bar --- */}
        <Text style={styles.heading}>Select or Create Exercise</Text>
        <Text style={styles.subHeading}>(long press to delete)</Text>
        <View style={styles.actionBar}>
          <AppButton 
            onPress={() => setInputModalVisible(true)}
            title="Create New Exercise"
            style={styles.actionButton}
            variant="primary"
          />
          <AppButton
              onPress={onCancel}
              title="Cancel"
              style={styles.actionButton}
              variant="cancel"
            />
        </View>
        {/* --- Exercise List --- */}
        <FlatList
          data={exerciseList}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => 
            <TouchableOpacity 
              style={styles.listItemCard}
              onPress={() => onAddExercise(item.name)}
              onLongPress={() => validateDelete(item.name)}
            >
              <Text style={styles.listItemText}>{item.name}</Text>
            </TouchableOpacity>
          }
          />
        {/* --- Input Modal --- */}
        <ExerciseInput
          visible={inputModalVisible} 
          onInputExercise={validateInput}
          onInputCancel={() => setInputModalVisible(false)}
        />
      </View>
    </Modal>
  );
};

export default AddExercise;