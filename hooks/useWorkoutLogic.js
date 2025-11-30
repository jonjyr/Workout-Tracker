import { useState } from 'react';
import { saveWorkout } from '../sqlconnection/db';

export const useWorkoutLogic = () => {
    const [exercises, setExercises] = useState([]);
    const [modals, setModals] = useState({
        addExercise: false,
        exerciseInput: false,
        chooseWorkout: false
    });

    const toggleModal = (modalName, value) => {
        setModals(prevModals => ({ ... prevModals, [modalName]: value }));
    };

    const addExercise = (name) => {
        if (exercises.find(exercises.name.toLowerCases() === name.toLowerCase())) {
            alert('Exercise already exists');
            return;
        };
        const newExercise = {
            name,
            sets: []
        };
        setExercises(prevExercises => [...prevExercises, newExercise]);
        toggleModal('addExercise', false);
        toggleModal('exerciseInput', false);
    };

    const addSet = (exerciseName) => {
        setExercises (prevExercises => prevExercises.map (exercise => {
            if (exercise.name === exerciseName) {
                return {
                    ...exercise,
                    sers: [...exercise.sets, {weight: '', reps: ''}]
                };
            }
            return exercise;
        }));
    };

    const updateSets = (exerciseName, index, key, value) => {
        setExercises(prevExercises => prevExercises.map(exercise => {
            if (exercise.name !== exerciseName) return exercise;
            const newSets = [...exercise.sets];
            newSets[index] = {...newSets[index], [key]: value};
            return {...exercise, sets: newSets};
        }));
    };

    const deleteExercise = (name) => {
        setExercises(prevExercises => prevExercises.filter(exercise => exercise.name !== name));
    };

    const deleteSet = (exerciseName, index) => {
        setExercises(prevExercises => prevExercises.map(exercise => {
            if (exercise.name !== exerciseName) return exercise;
            const newSets = [...exercise.sets];
            newSets.splice(index, 1);
            return {...exercise, sets: newSets};
        }));
    };

    const importWorkout = (workout) => {
        try {
            setExercises(workout.data);
            toggleModal('chooseWorkout', false);
        } catch (error) {
            console.error('Error importing workout:', error.message);
        }
    };

    const saveWorkoutToDB = async () => {
        try {
            const date = new Date().toISOString();
            await saveWorkout(exercises, date);
            alert('Workout saved successfully!');
            setExercises([]);
        } catch (error) {
            console.error('Error saving workout:', error.message);
        }
    };

    return {
        exercises,
        modals,
        toggleModal,
        handlers: {
            addExercise,
            addSet,
            updateSets,
            deleteExercise,
            deleteSet,
            importWorkout,
            saveWorkoutToDB
        }
    };
};