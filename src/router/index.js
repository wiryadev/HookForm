import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormScreen from "../screens/Form";

const Stack = createNativeStackNavigator()

export default Router = () => (
  <Stack.Navigator
  initialRouteName="FormScreen"
  screenOptions={{ headerShown: false }}
>
  {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
  <Stack.Screen name="FormScreen" component={FormScreen} />
</Stack.Navigator>
)