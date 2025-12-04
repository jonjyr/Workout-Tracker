import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WorkoutTracker from './screens/WorkoutTracker';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WorkoutTracker />
    </GestureHandlerRootView>
  );
}