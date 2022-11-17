import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormScreen from "../screens/Form";
import HomeScreen from "../screens/Home";

const Stack = createNativeStackNavigator()

export default Router = () => (
  <Stack.Navigator
  initialRouteName="HomeScreen"
  // initialRouteName="FormScreen"
  screenOptions={{ headerShown: false }}
>
  <Stack.Screen name="HomeScreen" component={HomeScreen} />
  <Stack.Screen name="FormScreen" component={FormScreen} />
</Stack.Navigator>
)