import * as SQLite from 'expo-sqlite';

// Async function for initializing the database and creating tables if they don't exist
// FYI: Use useNewConnection to not crash when database is emptied
export const init = async() => {
  const db = await SQLite.openDatabaseAsync('exercises.db', { useNewConnection: true });
  await db.execAsync('PRAGMA journal_mode = WAL;' +
    'CREATE TABLE IF NOT EXISTS exercises(id INTEGER PRIMARY KEY, name TEXT NOT NULL);' +
    'CREATE TABLE IF NOT EXISTS workouts(id INTEGER PRIMARY KEY, data TEXT NOT NULL, date TEXT NOT NULL);');
  return db;
};

// Async function for saving an exercise to DB in AddExercise.js
export const saveExercise = async (name) => {
  const db = await init();
  const statement = await db.prepareAsync('INSERT INTO exercises (name) VALUES ($name)');
  await statement.executeAsync({ $name: name });
  await statement.finalizeAsync();
};

// Async function for deleting an exercise from DB in AddExercise.js
export const deleteExercise = async (name) => {
  const db = await init();
  const statement = await db.prepareAsync('DELETE FROM exercises WHERE name = $name');
  await statement.executeAsync({ $name: name });
  await statement.finalizeAsync();
};

// Async function for fetching all exercises from DB in AddExercise.js
export const fetchAllExercises = async () => {
  try{
      const db=await init();
      const result = await db.getAllAsync('SELECT * FROM exercises'); 
      return result;
  }
  catch (error) {
      throw new Error("Error fetching exercises: " + error.message);   
  }
};

// Async function for saving workout to DB in App.js
export const saveWorkout = async (exercises, date) => {
  const db = await init();
  const statement = await db.prepareAsync('INSERT INTO workouts (data, date) VALUES ($data, $date)');
  await statement.executeAsync({ $data: JSON.stringify(exercises), $date: date }); // FYI: Stringify data from JSON here
  await statement.finalizeAsync();
};

// Async function for deleting a saved workout from DB in ChooseWorkout.js
export const deleteWorkout = async (id) => {
  const db = await init();
  const statement = await db.prepareAsync('DELETE FROM workouts WHERE id = $id');
  await statement.executeAsync({ $id: id });
  await statement.finalizeAsync();
};

// Async function for fetching all saved workouts from DB in ChooseWorkout.js
export const fetchAllWorkouts = async() => {
  try{
      const db = await init();
      const result = await db.getAllAsync('SELECT * FROM workouts');
      return result.map(workout => ({...workout, data: JSON.parse(workout.data)})); // FYI: Convert data to JSON here
  }
  catch (error) {
      throw new Error("Error fetching workouts: " + error.message); 
  }
};