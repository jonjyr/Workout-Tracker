/**
 * File for interacting with SQLite database
 */

import * as SQLite from 'expo-sqlite';

// --- Singleton Instance ---
// This ensures that only one instance of the database connection is created
let dbInstance = null;

// --- Initialization ---

/**
 * Initializes the SQLite database connection
 * If a connection exists, it returns it immediately
 * @returns {Promise<SQLite.SQLiteDatabase>} The database instance
 */
export const init = async () => {
  if (dbInstance) {
    return dbInstance;
  }

  const db = await SQLite.openDatabaseAsync('exercises.db');

  await db.execAsync(
    'PRAGMA journal_mode = WAL;' +
      'CREATE TABLE IF NOT EXISTS exercises(id INTEGER PRIMARY KEY, name TEXT NOT NULL);' +
      'CREATE TABLE IF NOT EXISTS workouts(id INTEGER PRIMARY KEY, data TEXT NOT NULL, date TEXT NOT NULL);',
  );

  dbInstance = db;

  return dbInstance;
};

// --- Add Exercise Operations ---

/**
 * Saves a new exercise to the database
 * @param {string} name - The name of the exercise (e.g. "Bench Press")
 */
export const saveExercise = async (name) => {
  const db = await init();
  await db.runAsync('INSERT INTO exercises (name) VALUES ($name)', {
    $name: name,
  });
};

/**
 * Deletes an exercise from the database by its name
 * @param {string} name - The name of the exercise to remove
 */
export const deleteExercise = async (name) => {
  const db = await init();
  await db.runAsync('DELETE FROM exercises WHERE name = $name', {
    $name: name,
  });
};

/**
 * Retrieves all saved exercises from the database
 * @returns {Promise<Array<{id: number, name: string}>>} List of exercises
 * @throws {Error} If fetching fails
 */
export const fetchAllExercises = async () => {
  try {
    const db = await init();
    const result = await db.getAllAsync('SELECT * FROM exercises');

    return result;
  } catch (error) {
    throw new Error(`Error fetching exercises: ${error.message}`);
  }
};

// --- Save Workout Operations ---

/**
 * Saves a new workout to the database
 * @param {Array<Object>} exercises - Array of exercise objects
 * @param {string} date - ISO formatted date string
 */
export const saveWorkout = async (exercises, date) => {
  const db = await init();
  const jsonData = JSON.stringify(exercises);

  await db.runAsync('INSERT INTO workouts (data, date) VALUES ($data, $date)', {
    $data: jsonData,
    $date: date,
  });
};

/**
 * Deletes a saved workout from the database by its ID
 * @param {number} id - The unique ID of the saved workout
 */
export const deleteWorkout = async (id) => {
  const db = await init();
  await db.runAsync('DELETE FROM workouts WHERE id = $id', { $id: id });
};

/**
 * Retrieves and parses the JSON data for all saved workouts from the database
 * @returns {Promise<Array<Object>>} List of workouts with parsed 'data' fields
 * @throws {Error} If fetching fails
 */
export const fetchAllWorkouts = async () => {
  try {
    const db = await init();
    const result = await db.getAllAsync('SELECT * FROM workouts');

    return result.map((workout) => ({
      ...workout,
      data: JSON.parse(workout.data),
    }));
  } catch (error) {
    throw new Error(`Error fetching workouts: ${error.message}`);
  }
};
