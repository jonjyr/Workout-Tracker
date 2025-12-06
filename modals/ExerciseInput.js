import { View, Text, Modal, TextInput } from 'react-native';
import { AppButton } from '../components/AppButton';
import { mainStyles as styles } from '../styles/mainStyles';
import { colors } from '../styles/theme';
import { useExerciseInput } from '../hooks/useExerciseInput';

/**
 * Modal component for user input of a new exercise
 * @param {Object} props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {function} props.onInputExercise - Callback for submitting the input
 * @param {function} props.onInputCancel - Callback for canceling
 * @returns {JSX.Element} - Modal component
 */
const ExerciseInput = ({ visible }) => {
  const { name, setName, handleCancel, handleSubmit } = useExerciseInput();

  return (
    <Modal 
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.inputScreen}>
        <View style={styles.inputContainer}>
          <Text style={styles.heading}>Create New Exercise</Text>
          <TextInput
            style={styles.input}
            placeholder="Exercise name"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            autoFocus={true}
          />
          <View style={styles.actionBar}>
            <AppButton 
              onPress={handleSubmit}
              title="Create"
              style={styles.actionButton}
              variant="primary"
            />
            <AppButton
              onPress={handleCancel}
              title="Cancel"
              style={styles.actionButton}
              variant="cancel"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ExerciseInput;