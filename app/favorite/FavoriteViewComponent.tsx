import { Button, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import useAppStateStore, { FavoriteState } from "../state/StateStore";

const FavoriteViewComponent = ({ navigation }) => {
    const { favoriteMeals, removeFavoriteById } = useAppStateStore();

    if (favoriteMeals.length == 0) {
        return (
            <SafeAreaView className="flex-1">
                <View className="flex-1 flex-col px-8 pt-8 justify-center items-center">
                    <Text className="font-[Ubuntu-Medium] text-[18px] mb-4">No Favorites Saved</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (favoriteMeals.length > 0) {
        return (
            <SafeAreaView className="flex-1">
                <View className="flex-col px-8 pt-8 flex-1">
                    <Text className="font-[Ubuntu-Medium] text-[18px] mb-4">My Favorites:</Text>
                    <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                        data={favoriteMeals}
                        keyExtractor={(item) => (item.id)}
                        renderItem={({ item }) => (
                            <TouchableOpacity className="flex-row p-2 items-center bg-white rounded-2xl mt-1 mb-1" onPress={() => navigation.navigate("MealDetails", { mealId: item.id })} >
                                <Image className="w-[60px] h-[60px] rounded-2xl" source={({ uri: item.url })} />
                                <View className="flex-1 flex-col pl-2 justify-center">
                                    <Text className="font-[Ubuntu-Regular] text-[18px]">{item.name}</Text>
                                    <Text className="font-[Ubuntu-Regular] mt-1">{item.category} | {item.area}</Text>
                                </View>
                                <TouchableOpacity className="bg-red-500 rounded-full p-3" onPress={() => removeFavoriteById(item.id)}>
                                    <Image className="w-[15px] h-[15px]" source={require('../../assets/close.png')} style={{ tintColor: '#fff' }} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </SafeAreaView>
        );
    }

};

export default FavoriteViewComponent;