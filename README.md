<div align="right">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
</div>

# Workout Tracker

> **A no-nonsense, privacy-focused mobile workout logging app built for speed,  persistence and pure muscle *GAINS!*** 🏋️

## Technologies
- React Native
- Expo
- SQLite
- JavaScript
- React Native Gesture Handler

## About

This personal project challenges the trend of bloated, data-snooping, subscription-based fitness apps. It is a strictly offline-first mobile application that prioritizes data sovereignty and zero-latency interactions using a lightweight React Native powered interface with local SQLite database.

## Demo

| **1. The Setup** | **2. The Grind** | **3. The History** |
|:---:|:---:|:---:|
| *Quickly create custom exercises without menu diving.* | *Log sets, adjust weights, and swipe-to-delete in real-time.* | *Review past sessions pulled directly from persistent local storage.* |
| ![Setup GIF](./assets/demo_setup.gif) | ![Grind GIF](./assets/demo_grind.gif) | ![History GIF](./assets/demo_history.gif) |

## 🛠 Technical Stack & Key Decisions

### **Core Framework: React Native (Expo)**
* **Why:** Rapid prototyping and seamless cross-platform deployment (Android/iOS) without the overhead of maintaining native build pipelines for an MVP.
* **Environment:** Managed workflow using Expo Go.

### **Persistence: SQLite (expo-sqlite)**
* **Why:** `AsyncStorage` is insufficient for structured relational data. SQLite was chosen to enable complex querying and robust data integrity.
* **Performance:** Database journal mode set to **WAL (Write-Ahead Logging)** to ensure non-blocking reads and concurrent writes for a buttery smooth UI.

### **State Management: Custom Hooks Pattern**
* **Why:** Avoided the boilerplate of Redux for this scope. Logic is decoupled from the view using the `useWorkoutTracker` custom hook, separating UI concerns from business logic and database transactions.

### **UI/UX: Gesture Handler**
* **Why:** Mobile users expect tactile feedback. Implemented `Swipeable` components for destructive actions (deleting sets/exercises) to reduce UI clutter and button fatigue.

## Project Architecture

The codebase follows a separation of concerns principle, keeping SQL logic isolated from UI components.

```
root
├── hooks/
│   └── useWorkoutTracker.js  # CENTRAL LOGIC: Manages state, modals, and bridges UI to DB.
├── sqlconnection/
│   └── db.js                 # DATA LAYER: Raw SQL queries, WAL mode init, and transaction handling.
├── screens/
│   └── WorkoutTracker.js     # VIEW: Main functional component, mostly presentational.
├── modals/                   # MODULAR UI: Isolated modal components for cleaner main view.
│   ├── AddExercise.js
│   ├── ChooseWorkout.js
|   └── ExerciseInput.js
├── components/               
|   └── AppButton.js          # REUSABLE UI: Reusable button component.
└── styles/
    ├── mainStyles.js         # STYLESHEET: Shared styles for the application.
    └── theme.js              # THEME: Color, spacing and typography definitions.
```

## Getting Started

1. Clone the repository

    > git clone [https://github.com/jonjyr/workout-tracker.git](https://github.com/jonjyr/workout-tracker.git)\
    > cd workout-tracker

2. Install Dependencies
    
    > npm install

3. Run the Application
    > npx expo start

## Future Roadmap

- **TypeScript Migration:** To enhance maintainability with stricter type checking.

- **Data Visualization:** Add charts to visualize volume progression over time.

- **Muscle Map:** Visualize the workout volume for muscle group with an interactive muscle map.

- **Data Export:** Implement a feature that allows users to export their data to different file types.

- **Dark Mode:** Add a toggle for dark mode.