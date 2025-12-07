import { useState } from 'react';

/**
 * Custom hook for handling user input for a new exercise
 * Handles input state and button handlers
 * @param {Object} props
 * @param {function} props.onInputExercise - Callback for submitting the input
 * @param {function} props.onInputCancel - Callback for canceling the modal
 * @returns {Object} - Object containing input state and handlers for the input modal
 */
export const useExerciseInput = ({ onInputExercise, onInputCancel }) => {
  // --- State for Input ---
  const [name, setName] = useState('');

  // --- Handlers ---

  /**
   * Handler for canceling the input screen
   */
  const handleCancel = () => {
    setName('');
    onInputCancel();
  };

  /**
   * Handler for submitting the input
   * Checks if the input is empty
   */
  const handleSubmit = () => {
    if (!name.trim()) return;
    onInputExercise(name);
    setName('');
  };

  return { name, setName, handleCancel, handleSubmit };
};
