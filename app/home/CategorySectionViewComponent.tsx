import CategoryViewComponent from "./CategoryViewComponent";
import { fetchCategories, fetchMeal } from '../api/ApiHandler';
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

const CategorySectionViewComponent = ({ selectedCategory, onCategoryClick }) => {

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    });

    if (isPending) {
        return (
            <View className="mt-4 p-1">
                <View className="p-1 h-[90px] flex-1 flex-col items-center justify-center">
                    <ActivityIndicator size={"large"} />
                </View>
            </View>
        );
    }

    if (isError) {
        return (
            <View className="mt-4 p-1">
                <View className="p-1 h-[90px] flex-1 flex-col items-center justify-center">
                    <Text>Error fetching categories</Text>
                    <TouchableOpacity>
                        <Text className="font-[Ubuntu-Medium] text-[12px] text-[#008f58]">Retry</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (data) {
        return (
            <FlatList
                className="mt-4 p-1 px-0"
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={data["categories"]}
                keyExtractor={(item) => item["idCategory"].toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onCategoryClick(item["strCategory"])}>
                        <CategoryViewComponent categoryName={item["strCategory"]} categoryThumbURL={item["strCategoryThumb"]} isSelected={selectedCategory === item["strCategory"]} />
                    </TouchableOpacity>
                )}
            />
        );
    }
};

export default CategorySectionViewComponent;