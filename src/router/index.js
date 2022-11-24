import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "../screens/Detail";
import FormScreen from "../screens/Form";
import HomeScreen from "../screens/Home";

const Stack = createNativeStackNavigator()

export default Router = () => (
  <Stack.Navigator
  initialRouteName="HomeScreen"
  screenOptions={{ headerShown: false }}
>
  <Stack.Screen name="HomeScreen" component={HomeScreen} />
  <Stack.Screen name="DetailScreen" component={DetailScreen} />
  <Stack.Screen name="FormScreen" component={FormScreen} />
</Stack.Navigator>
)