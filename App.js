import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WorkoutTracker from './screens/WorkoutTracker';

/**
 * Root component of the application
 * Sets up the gesture handler context for swipeable components
 * @returns {JSX.Element} - Root component
 */
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WorkoutTracker />
    </GestureHandlerRootView>
  );
}
