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
  const statement = await db.prepareAsync(
    'INSERT INTO exercises (name) VALUES ($name)',
  );

  await statement.executeAsync({ $name: name });
  await statement.finalizeAsync();
};

/**
 * Deletes an exercise from the database by its name
 * @param {string} name - The name of the exercise to remove
 */
export const deleteExercise = async (name) => {
  const db = await init();
  const statement = await db.prepareAsync(
    'DELETE FROM exercises WHERE name = $name',
  );

  await statement.executeAsync({ $name: name });
  await statement.finalizeAsync();
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
  const statement = await db.prepareAsync(
    'INSERT INTO workouts (data, date) VALUES ($data, $date)',
  );
  const jsonData = JSON.stringify(exercises);

  await statement.executeAsync({ $data: jsonData, $date: date });
  await statement.finalizeAsync();
};

/**
 * Deletes a saved workout from the database by its ID
 * @param {number} id - The unique ID of the saved workout
 */
export const deleteWorkout = async (id) => {
  const db = await init();
  const statement = await db.prepareAsync(
    'DELETE FROM workouts WHERE id = $id',
  );

  await statement.executeAsync({ $id: id });
  await statement.finalizeAsync();
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
