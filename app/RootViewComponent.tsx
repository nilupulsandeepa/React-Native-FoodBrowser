import { Image, ImageComponent, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import HomeViewComponent from "./home/HomeViewComponent";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from "@react-navigation/native";
import FavoriteViewComponent from "./favorite/FavoriteViewComponent";
import HomeNavigationViewComponent from "./home/HomeNavigationViewComponent";
import FavoriteNavigationViewComponent from "./favorite/FavoriteNavigationViewComponent";

const BottomTab = createBottomTabNavigator();

const RootViewComponent = () => {
    return (
        <NavigationContainer>
            <BottomTab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconSource;

                        if (route.name === 'Home') {
                            iconSource = focused ? require('../assets/home-fill.png') : require('../assets/home.png');
                        } else if (route.name === 'Favorites') {
                            iconSource = focused ? require('../assets/heart-fill.png') : require('../assets/heart.png');
                        }
                        return <Image className='w-[16px] h-[16px]' source={iconSource} style={[{tintColor: focused? '#008f58' : '#000000'}]} />
                    },
                    headerShown: false,
                    tabBarActiveTintColor: '#008f58',
                    tabBarInactiveTintColor: '#000000',
                    tabBarStyle: { backgroundColor: '#ffffff' },
                })}
            >
                <BottomTab.Screen
                    name='Home'
                    component={HomeNavigationViewComponent}
                />
                <BottomTab.Screen
                    name='Favorites'
                    component={FavoriteNavigationViewComponent}
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    );
};

export default RootViewComponent;

// {{
//     headerShown: false,
//     tabBarActiveTintColor: '#008f58',
//     tabBarInactiveTintColor: 'gray',
//     tabBarStyle: { backgroundColor: '#ffffff' }
// }}