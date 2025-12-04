import { View, Text, Modal, TextInput } from 'react-native';
import { useState } from 'react';
import { AppButton } from '../components/ui/AppButton';
import { mainStyles as styles } from '../styles/mainStyles';
import { colors } from '../styles/theme';

// Modal component for inputting a new exercise to a list in AddExercise.js
const ExerciseInput = ({visible, onInputExercise, onInputCancel}) => {
  // State for exercise name in input
  const [name, setName] = useState('');

  // Function for cancel button
  const cancelInputScreen = () => {
    setName(''); 
    onInputCancel();
  }

  // Function for add exercise button
  const inputExercise = () => {
    if (!name.trim()) return;
    onInputExercise(name);
    setName('');
  }

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
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
              onPress={inputExercise}
              title="Create"
              style={styles.actionButton}
              variant="primary"
            />
            <AppButton
              onPress={cancelInputScreen}
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