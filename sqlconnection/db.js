import * as SQLite from 'expo-sqlite';

export const init = async() => {
  const db = await SQLite.openDatabaseAsync('exercises.db', { useNewConnection: true });
  await db.execAsync('PRAGMA journal_mode = WAL;create table if not exists exercises(id integer not null primary key, name text not null);create table if not exists workouts(id integer primary key not null, data text not null, date text not null);');
  return db;
};

export const saveExercise = async (name) => {
  const db = await init();
  const statement = await db.prepareAsync('INSERT INTO exercises (name) VALUES ($name)');
  await statement.executeAsync({ $name: name });
  await statement.finalizeAsync();
};

export const deleteExercise = async (name) => {
  const db = await init();
  const statement = await db.prepareAsync('DELETE FROM exercises WHERE name = $name');
  await statement.executeAsync({ $name: name });
  await statement.finalizeAsync();
};

export const fetchAllExercises = async() => {
  try{
      const db=await init();
      const result = await db.getAllAsync('SELECT * FROM exercises');
      return result;
  }
  catch(err){
      throw new Error("Error fetching exercises: " + err.message);   
  }
};

export const saveWorkout = async (exercises, date) => {
  const db = await init();
  const statement = await db.prepareAsync('INSERT INTO workouts (data, date) VALUES ($data, $date)');
  await statement.executeAsync({ $data: JSON.stringify(exercises), $date: date });
  await statement.finalizeAsync();
};

export const deleteWorkout = async (id) => {
  const db = await init();
  const statement = await db.prepareAsync('DELETE FROM workouts WHERE id = $id');
  await statement.executeAsync({ $id: id });
  await statement.finalizeAsync();
};

export const fetchAllWorkouts = async() => {
  try{
      const db=await init();
      const result = await db.getAllAsync('SELECT * FROM workouts');
      return result.map(workout => ({...workout, data: JSON.parse(workout.data)}));
  }
  catch (error) {
      throw new Error("Error fetching workouts: " + error.message); 
  }
};