import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Button, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fetchMeal } from "../api/ApiHandler";
import useAppStateStore, { FavoriteItem, FavoriteState } from "../state/StateStore";
import { useRef } from "react";

type Ingredient = { ingredient: string, quantity: string };

const MealDetailViewComponent = ({ navigation, route }) => {
    const { mealId } = route.params;
    const { favoriteMeals, addFavorite, removeFavoriteById } = useAppStateStore();
    let isInFavorite = useRef(false);

    const handleNavigationBack = () => {
        navigation.goBack();
    };

    const selectFavoriteIcon = () => {
        if (favoriteMeals.some((obj) => obj.id === mealId)) {
            isInFavorite.current = true;
            return require('../../assets/heart-fill.png');
        } else {
            isInFavorite.current = false;
            return require('../../assets/heart.png')
        }
    }

    const handleAddToFavorite = (mealItem) => {
        if (isInFavorite.current) {
            isInFavorite.current = false;
            removeFavoriteById(mealId);
        } else {
            isInFavorite.current = true;
            addFavorite({ id: mealItem["idMeal"], name: mealItem["strMeal"], area: mealItem["strArea"], category: mealItem["strCategory"], url: mealItem["strMealThumb"] + "/preview" });
        }
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['meal_details' + mealId],
        queryFn: () => fetchMeal(mealId)
    });

    if (isPending) {
        return (
            <View className="flex-1 mt-4 p-1">
                <View className="p-1 h-[90px] flex-1 flex-col items-center justify-center">
                    <ActivityIndicator size={"large"} />
                </View>
            </View>
        );
    }

    if (isError) {
        return (
            <View className="flex-1 mt-4 p-1">
                <View className="p-1 h-[90px] flex-1 flex-col items-center justify-center">
                    <Text className="font-[Ubuntu-Regular] text-[14px] text-[#000000]">Error fetching recipe details</Text>
                    <TouchableOpacity>
                        <Text className="font-[Ubuntu-Medium] text-[12px] text-[#008f58]">Retry</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (data) {
        const mealItem = data["meals"][0];
        const ingredients: ({ingredient: string, quantity: string} | null)[] = Array.from({length: 20}, (_, i) => {
            const index = i + 1;
            const ingredient = mealItem[`strIngredient${index}`]?.trim();
            const quantity = mealItem[`strMeasure${index}`]?.trim();
            return ingredient ? { ingredient: ingredient.charAt(0).toUpperCase() + ingredient.slice(1), quantity: quantity || null} : null;
        }).filter(Boolean);

        return (
            <View className="flex-1 flex-col bg-white justify-start">
                <Image className="w-full h-[45%]" source={{ uri: mealItem["strMealThumb"] }} style={{ position: 'absolute', resizeMode: 'cover' }} />
                <SafeAreaView className="flex-1">
                    <ScrollView horizontal={false} className="flex-1 flex-col" showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View key={"1"} className="flex-row px-8 pt-8">
                            <TouchableOpacity className="p-3 bg-white rounded-full" onPress={handleNavigationBack}>
                                <Image className="w-[20px] h-[20px]" source={require('../../assets/back.png')} />
                            </TouchableOpacity>
                            <View className="flex-1"></View>
                            <TouchableOpacity className="p-3 bg-white rounded-full" onPress={() => handleAddToFavorite(mealItem)}>
                                <Image className="w-[20px] h-[20px]" source={selectFavoriteIcon()} style={{tintColor: isInFavorite.current ? '#008f58' : '#000000'}} />
                            </TouchableOpacity>
                        </View>
                        <View key={"2"} className="flex-1 bg-white px-8 pt-8 mt-[40%] h-full rounded-t-3xl">
                            <Text className="font-[Ubuntu-Medium] text-[18px] text-[#008f58]">{mealItem["strMeal"]}</Text>
                            <Text className="font-[Ubuntu-Regular] text-[14px] text-[#000000] mt-2">{mealItem["strArea"]} | {mealItem["strCategory"]}</Text>
                            <Text className="font-[Ubuntu-Regular] text-[18px] text-[#008f58] mt-4">Ingredients: </Text>
                            <View className="mt-2">
                                {ingredients.map((item, index) => (
                                    <View key={"ingredient_"+index} className="flex-row">
                                        <Text className="font-[Ubuntu-Regular] text-[14px] text-[#000000] mt-2">{item.ingredient}</Text>
                                        <View className="flex-1" />
                                        <Text className="font-[Ubuntu-Regular] text-[14px] text-[#000000] mt-2">{item.quantity}</Text>
                                    </View>
                                ))}
                            </View>
                            <Text className="font-[Ubuntu-Regular] text-[18px] text-[#008f58] mt-4">Instructions: </Text>
                            <Text className="font-[Ubuntu-Regular] text-[14px] text-[#000000] mt-4">{mealItem["strInstructions"]}</Text>
                            <View className="h-[15px]"></View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
        return (
            <SafeAreaView className="flex-1">
                <View className="flex-1 flex-col px-8 pt-8">
                    <Text>Detail View: {mealId}</Text>
                    <Button title="Back" onPress={() => navigation.goBack()} />
                    <Button title="Mark Favorite" onPress={() => addFavorite({ id: mealItem["idMeal"], name: mealItem["strMeal"], area: mealItem["strArea"], category: mealItem["strCategory"], url: mealItem["strMealThumb"] + "/preview" })} />
                    <Button title="Remove Favorite" />
                    <Button title="Show Favorite" onPress={() => console.log(favoriteMeals)} />
                    <Text>{JSON.stringify(data)}</Text>
                </View>
            </SafeAreaView>
        );
    }
}

export default MealDetailViewComponent;