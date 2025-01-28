import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeViewComponent from "./HomeViewComponent";
import MealDetailViewComponent from "../details/MealDetailViewComponent";

const StackNavigator = createNativeStackNavigator();

const HomeNavigationViewComponent = () => {
    return (
        <StackNavigator.Navigator
        screenOptions={{
            headerShown: false
        }}>
            <StackNavigator.Screen name="HomeMain" component={HomeViewComponent} />
            <StackNavigator.Screen name="MealDetails" component={MealDetailViewComponent} />
        </StackNavigator.Navigator>
    );
};

export default HomeNavigationViewComponent;