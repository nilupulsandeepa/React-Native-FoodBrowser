import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MealCardViewComponent from "./MealCardViewComponent";
import { useQuery } from "@tanstack/react-query";
import { searchMeal } from "../api/ApiHandler";

const SearchViewComponent = ({ searchTerm, onItemClick }) => {

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['search' + searchTerm],
        queryFn: () => searchMeal(searchTerm)
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
                    <Text className="font-[Ubuntu-Regular] text-[14px] text-[#000000]">Error fetching categories</Text>
                    <TouchableOpacity>
                        <Text className="font-[Ubuntu-Medium] text-[12px] text-[#008f58]">Retry</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (data) {
        if (data["meals"] !== null) {
            console.log(data["meals"])
            return (
                <View className="pb-4">
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        className="mt-4"
                        scrollEnabled={true}
                        data={data["meals"]}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <View className="flex-1 items-center">
                                <TouchableOpacity className="flex-1 items-center" onPress={() => onItemClick(item["idMeal"])}>
                                    <MealCardViewComponent mealId={item["idMeal"]} mealName={item["strMeal"]} area={item["strArea"]} thumbnailURL={item["strMealThumb"]} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            );
        } else {
            return (
                <View className="flex-1 mt-4 p-1">
                    <View className="p-1 h-[90px] flex-1 flex-col items-center justify-center">
                        <Text className="font-[Ubuntu-Regular] text-[14px] text-[#000000]">No Meals Found! Search Again!</Text>
                    </View>
                </View>
            );
        }
    }
};

export default SearchViewComponent;