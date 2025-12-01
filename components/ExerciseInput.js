import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { AppButton } from './AppButton';

// Modal component for inputting a new exercise to a list in AddExercise.js
const ExerciseInput = ({visible, onInputExercise, onInputCancel}) => {
  // State for exercise name in input
  const [name, setName] = useState('');

  // Function for cancel button
  const cancelInputModal = () => {
    setName(''); 
    onInputCancel();
  }

  // Function for add exercise button
  const inputExercise = (name) => {
    setName(''); 
    onInputExercise(name);
  }

  return (
    <Modal visible={visible}>
      <View style={styles.screen}>
        <Text style={styles.heading}>Add a new exercise</Text>
        <View>
          <TextInput 
            style={styles.input}
            placeholder="Exercise name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <AppButton 
              onPress={() => inputExercise(name)}
              title="Add Exercise"
              style={styles.setButton}
              textStyle={styles.setButtonText}
              variant="secondary"
            />
          </View>
          <View style={styles.buttonStyle}>
            <TouchableOpacity 
              style={styles.cancelStyle}
              onPress={() => cancelInputModal()}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>  
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  heading: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'skyblue',
    padding: 10,
  },
  input: {
    width: '90%',
    borderWidth: 2,
    borderColor: 'black',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    width: '30%',
  },
  cancelStyle: {
    borderWidth: 1,
    padding: 7,
    borderColor: '#565656',
  },
  cancelText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#565656',
  },
});

export default ExerciseInput;