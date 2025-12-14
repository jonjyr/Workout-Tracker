import { useState } from 'react';

/**
 * Custom hook for handling user input for a new exercise
 * Handles input state and button handlers
 * @param {function} onInputExercise - Parent handler to create a new exercise
 * @param {function} onInputCancel - Parent handler to close the input modal
 * @returns {Object} - Object containing input state and handlers for the input modal
 */
export const useExerciseInput = (onInputExercise, onInputCancel) => {
  // --- State for Input ---
  const [name, setName] = useState('');

  // --- Handlers ---

  /**
   * Handler for canceling the input screen
   */
  const handleCancel = () => {
    setName('');
    if (onInputCancel) onInputCancel();
  };

  /**
   * Handler for submitting the input
   * Checks if the input is empty
   */
  const handleSubmit = () => {
    if (!name.trim()) return;
    if (onInputExercise) onInputExercise(name);
    setName('');
  };

  return { name, setName, handleCancel, handleSubmit };
};
