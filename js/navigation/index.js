import { StackNavigator } from "react-navigation"
import MainScreen from "../screens/MainScreen"

export default StackNavigator({
  Main: { screen: MainScreen }
}, {
  initialRouteName: "Main",
  headerMode: "screen",
  mode: "modal"
})