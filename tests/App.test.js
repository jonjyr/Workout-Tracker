import { renderHook, act, waitFor } from '@testing-library/react-native';
import { useWorkoutTracker } from '../hooks/useWorkoutTracker';
import { useAddExercise } from '../hooks/useAddExercise';
import { useChooseWorkout } from '../hooks/useChooseWorkout';
import * as db from '../sqlconnection/db';

// --- Mocking the database functions ---
jest.mock('../sqlconnection/db', () => ({
  init: jest.fn(() => Promise.resolve()),
  fetchAllExercises: jest.fn(),
  saveExercise: jest.fn(),
  deleteExercise: jest.fn(),
  fetchAllWorkouts: jest.fn(),
  saveWorkout: jest.fn(),
  deleteWorkout: jest.fn(),
}));

/**
 * Test the Workout Tracker hook
 */
describe('Workout Tracker hook', () => {
  // --- Reset mocks before each test ---
  beforeEach(() => {
    jest.clearAllMocks();
    db.fetchAllExercises.mockResolvedValue([]);
    db.fetchAllWorkouts.mockResolvedValue([]);
  });

  // 1. Test Initialization
  it('should initialize with empty exercise list', () => {
    const { result } = renderHook(() => useWorkoutTracker());
    expect(result.current.exercises.length).toEqual(0);
  });
  
  // 2. Test Adding Exercise
  it('should add an existing exercise to Workout Tracker', () => {
    const { result } = renderHook(() => useWorkoutTracker());
    const exerciseName = 'Bench Press';

    act(() => {
      result.current.handlers.addExercise(exerciseName);
    });
    expect(result.current.exercises).toEqual(expect.arrayContaining([expect.objectContaining({ name: exerciseName, sets: [] })]));
  });

  // 3. Test Deleting Exercise
  it('should delete an existing exercise from Workout Tracker', () => {
    const { result } = renderHook(() => useWorkoutTracker());
    const exerciseName = 'Bench Press';

    act(() => {
      result.current.handlers.addExercise(exerciseName);
      result.current.handlers.deleteExercise(exerciseName);
    });
    expect(result.current.exercises).toEqual([]);
  });

  // 4. Test Adding Set
  it('should add an empty set to an existing exercise', () => {
    const { result } = renderHook(() => useWorkoutTracker());
    const exerciseName = 'Bench Press';

    act(() => {
      result.current.handlers.addExercise(exerciseName);
      result.current.handlers.addSet(exerciseName);
    });
    expect(result.current.exercises).toEqual(expect.arrayContaining([expect.objectContaining({ name: exerciseName, sets: [{ weight: '', reps: '' }] })]));
  });

  // 5. Test Editing Set
  it('should update a specific field (weight or reps) in a specific set', () => {
    const { result } = renderHook(() => useWorkoutTracker());
    const exerciseName = 'Bench Press';
    const index = 0;
    const key = 'weight';
    const value = '100';

    act(() => {
      result.current.handlers.addExercise(exerciseName);
      result.current.handlers.addSet(exerciseName);
      result.current.handlers.updateSets(exerciseName, index, key, value);
    });
    expect(result.current.exercises).toEqual(expect.arrayContaining([expect.objectContaining({ name: exerciseName, sets: [{ weight: '100', reps: '' }] })]));
  });

  // 6. Test Deleting Set
  it('should remove a specific set from an exercise', () => {
    const { result } = renderHook(() => useWorkoutTracker());
    const exerciseName = 'Bench Press';
    const index = 0;

    act(() => {
      result.current.handlers.addExercise(exerciseName);
      result.current.handlers.addSet(exerciseName);
      result.current.handlers.deleteSet(exerciseName, index);
    });
    expect(result.current.exercises).toEqual(expect.arrayContaining([expect.objectContaining({ name: exerciseName, sets: [] })]));
  });

  // 7. Test Saving Workout
  it('should save and clear the current workout', async () => {
    const { result } = renderHook(() => useWorkoutTracker());
    const exerciseName = 'Bench Press';
    
    act(() => {
      result.current.handlers.addExercise(exerciseName);
    });
    expect(result.current.exercises).toHaveLength(1);
    await act(async () => {
      await result.current.handlers.saveWorkoutToDB();
    });
    expect(db.saveWorkout).toHaveBeenCalled();
    expect(result.current.exercises).toHaveLength(0);
  });

  // 8. Test Loading Saved Workout
  it('should load a saved workout from the database', () => {
    const { result } = renderHook(() => useWorkoutTracker());
    const mockWorkout = {
      data: [{ name: 'Bench Press', sets: [{ weight: '100', reps: '5' }] }],
    };

    act(() => {
      result.current.handlers.importWorkout(mockWorkout);
    });
    expect(result.current.exercises).toEqual(mockWorkout.data);
  }); 
});

/**
 * Test the Choose Workout hook
 */
describe('Choose Workout hook', () => {
  // --- Reset mocks before each test ---
  beforeEach(() => jest.clearAllMocks());

  // 1. Test Deleting Saved Workout
  it('should delete a saved workout from the database', async () => {
    const mockInitialWorkouts = [{ id: 1, data: [], date: '2025-01-01' }];
    db.fetchAllWorkouts.mockResolvedValue(mockInitialWorkouts);

    const { result } = renderHook(() => useChooseWorkout(true));

    await waitFor(() => expect(result.current.workoutList).toHaveLength(1));
    db.fetchAllWorkouts.mockResolvedValueOnce([]);
    await act(async () => {
      await result.current.deleteWorkoutFromDB(1);
    });
    expect(db.deleteWorkout).toHaveBeenCalledWith(1);
    await waitFor(() => expect(result.current.workoutList).toHaveLength(0));
  });
});
 
/**
 * Test the Add Exercise hook
 */
describe('Add Exercise hook', () => {
  // --- Clear mocks before each test ---
  beforeEach(() => jest.clearAllMocks());

  // 1. Test Adding New Exercise to List of Exercises
  it('should add a new exercise to the list of exercises', async () => {
    db.fetchAllExercises
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: 1, name: 'Bench Press' }]);

    const { result } = renderHook(() => useAddExercise(true));

    await waitFor(() => expect(result.current.exerciseList).toEqual([]));
    await act(async () => {
      await result.current.inputExercise('Bench Press');
    });
    expect(db.saveExercise).toHaveBeenCalledWith('Bench Press');
    expect(result.current.exerciseList).toEqual(expect.arrayContaining([expect.objectContaining({ id: 1, name: 'Bench Press' })]));

  });

  // 2. Test Deleting Exercise from List of Exercises
  it('should delete an exercise from the list of exercises', async () => {
    db.fetchAllExercises
      .mockResolvedValueOnce([{ id: 1, name: 'Bench Press' }])
      .mockResolvedValueOnce([]);

    const { result } = renderHook(() => useAddExercise(true));
    const exerciseName = 'Bench Press';

    await waitFor(() => expect(result.current.exerciseList).toHaveLength(1));
    await act(async () => {
      await result.current.removeExercise(exerciseName);
    });
    expect(db.deleteExercise).toHaveBeenCalledWith(exerciseName);
    db.fetchAllExercises.mockResolvedValueOnce([]);
    await waitFor(() => expect(result.current.exerciseList).toHaveLength(0));
  });
});