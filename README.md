<h1 align="center">Workout Tracker</h1>

<div align="center">
    <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</div><br>

> **No-nonsense, cross-platform mobile app for logging workouts locally with fast iteration and data persistence!** 🏋️

## Technologies
- React Native
- Expo Go
- SQLite
- JavaScript
- React Native Gesture Handler

## Overview

Track your workouts anywhere, anytime. This personal project challenges the trend of bloated, data-snooping, subscription-based fitness apps. It is a strictly offline-first mobile application that prioritizes data sovereignty and zero-latency interactions using a lightweight React Native powered interface with local SQLite database.

## Demo

| **1. Exercise Setup** | **2. Workout Logging** | **3. Save & Export** |
|:---:|:---:|:---:|
| *Create custom exercises with minimal menu diving.* | *Log sets, edit values, and swipe-to-delete in real-time.* | *Save your sessions directly into persistent local storage.* |
| ![Setup GIF](./assets/demo_setup.gif) | ![Grind GIF](./assets/demo_grind.gif) | ![History GIF](./assets/demo_history.gif) |

## Project Architecture

The codebase follows a separation of concerns principle between UI, logic and database operations.

```text
root
├── hooks/
│   └── useWorkoutTracker.js  # Central Logic that manages state, modals, and bridges UI to DB.
├── sqlconnection/
│   └── db.js                 # Raw SQL queries, WAL mode init, and transaction handling.
├── screens/
│   └── WorkoutTracker.js     # Main screen and presentational layout.
├── modals/                   # Isolated modal components for cleaner main view.
│   ├── AddExercise.js
│   ├── ChooseWorkout.js
|   └── ExerciseInput.js
├── components/               
|   └── AppButton.js          # Reusable UI component.
└── styles/
    ├── mainStyles.js         
    └── theme.js              # Centralized style definitions.
```

## Getting Started

1. **Clone the repository**
    ```bash
    git clone https://github.com/jonjyr/workout-tracker.git
     ```
    
2. **Navigate to the project directory**
    ```bash
    cd workout-tracker
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Run the application**
    ```bash
    npx expo start
    ```

## Future Roadmap

- Migration to TypeScript for stricter typing and maintainability.

- Adding charts and maps to visualize workout volume and progression.

- Database schema refactoring.

- Data export implementation (CSV/JSON).

- Adding dark mode or theme customization.
