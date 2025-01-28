import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealDetailViewComponent from "../details/MealDetailViewComponent";
import FavoriteViewComponent from "./FavoriteViewComponent";

const StackNavigator = createNativeStackNavigator();

const FavoriteNavigationViewComponent = () => {
    return (
        <StackNavigator.Navigator
        screenOptions={{
            headerShown: false
        }}>
            <StackNavigator.Screen name="FavoriteMain" component={FavoriteViewComponent} />
            <StackNavigator.Screen name="MealDetails" component={MealDetailViewComponent} />
        </StackNavigator.Navigator>
    );
};

export default FavoriteNavigationViewComponent;