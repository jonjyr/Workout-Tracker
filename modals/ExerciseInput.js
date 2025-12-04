import { View, Text, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import { AppButton } from '../components/AppButton';
import { mainStyles as styles } from '../styles/mainStyles';
import { colors } from '../styles/theme';

// Modal component for inputting a new exercise to a list in AddExercise.js
/**
 * Modal component for user input of a new exercise
 * @param {Object} props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {function} props.onInputExercise - Callback for submitting the input
 * @param {function} props.onInputCancel - Callback for canceling
 * @returns {JSX.Element} - Modal component
 */
const ExerciseInput = ({ visible, onInputExercise, onInputCancel }) => {
  // --- State for Input ---
  const [name, setName] = useState('');

  // --- Handlers ---

  /**
   * Handler for canceling the input screen
   */
  const handleCancel = () => {
    setName(''); 
    onInputCancel();
  }

  /**
   * Handler for submitting the input
   * Checks if the input is empty
   */
  const handleSubmit = () => {
    if (!name.trim()) return;
    onInputExercise(name);
    setName('');
  }

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