import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  adaptNavigationTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Router from './src/router';


const { LightTheme } = adaptNavigationTheme({
  light: NavigationDefaultTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};

export default function App() {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        <Router />
      </NavigationContainer>
    </PaperProvider>
  );
}
