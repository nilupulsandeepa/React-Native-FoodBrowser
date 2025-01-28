import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ThemeProperties from "../Utils/ThemeProperties";
import RecommendedViewComponent from "./RecommendedViewComponent";
import CategorySectionViewComponent from "./CategorySectionViewComponent";
import { useRef, useState } from "react";
import { debounce } from "lodash";
import SearchViewComponent from "./SearchViewComponent";
import React from "react";
import CategorySearchViewComponent from "./CategorySearchViewComponent";
import Config from 'react-native-config';

const HomeViewComponent = ({ navigation }) => {
    let searchInput = useRef("");
    let searchInputRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const environment = Config["ENV"];

    const debounceHandler = debounce((value) => {
        console.log("Debounce : " + value);
        setSearchQuery(value);
    }, 500);

    const handleSearchInput = (text) => {
        console.log("Handle");
        searchInput = text;
        debounceHandler(searchInput);
    };

    const handleSearchClear = () => {
        searchInput = "";
        searchInputRef.current.clear();
        setSearchQuery("");
    };

    const handleMealDetail = (mealId: string) => {
        navigation.navigate("MealDetails", { mealId: mealId });
    };

    const handleCategorySelection = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 flex-col px-8 pt-8">
                <View className="flex-row items-center">
                    <View className="flex-1 flex-col">
                        <Text className="font-[Ubuntu-Regular] text-[14px] text-[#898989]">
                            Hello, Anne!
                        </Text>
                        <Text className="mt-2 font-[Ubuntu-Bold] text-[20px] text-[#000000]">
                            What would you like{"\n"}to cook today?
                        </Text>
                    </View>
                    <Image className="w-[50px] h-[50px] rounded-full" source={require("../../assets/profile_pic.png")} />
                </View>
                <View className={`flex-row items-center bg-white ${Platform.OS === 'android' ? 'p-2' : 'p-4'} mt-4 rounded-2xl`}>
                    <TextInput ref={searchInputRef} className="flex-1 font-[Ubuntu-Regular]" placeholder="Search any recipes" defaultValue={searchInput.current} onChangeText={handleSearchInput} />
                    <Image className="w-[20px] h-[20px] mr-2" style={styles.searchIcon} source={require("../../assets/search_icon.png")} />
                </View>
                {searchQuery != "" ?
                    <>
                        <View className="flex-row mt-8 items-center">
                            <Text className="flex-1 font-[Ubuntu-Medium] text-[16px]">Search results:</Text>
                            <TouchableOpacity onPress={handleSearchClear}>
                                <Text className="font-[Ubuntu-Medium] text-[12px] text-[#008f58]">Clear</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1">
                            <SearchViewComponent searchTerm={searchQuery} onItemClick={handleMealDetail} />
                        </View>
                    </>
                    :
                    <>
                        <View className="flex-row mt-8 items-center">
                            <Text className="flex-1 font-[Ubuntu-Medium] text-[16px]">Categories</Text>
                            <TouchableOpacity onPress={() => handleCategorySelection("")}>
                                <Text className="font-[Ubuntu-Medium] text-[12px] text-[#008f58]">Clear</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <CategorySectionViewComponent selectedCategory={selectedCategory} onCategoryClick={handleCategorySelection} />
                        </View>

                        {selectedCategory !== "" ?
                            <>
                                <CategorySearchViewComponent categoryTerm={selectedCategory} onItemClick={handleMealDetail} />
                            </>
                            :
                            <ScrollView className="flex-col" showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                                <View className="flex-col">
                                    <View className="flex-row mt-4 items-center">
                                        <Text className="flex-1 font-[Ubuntu-Medium] text-[16px]">Recommendation</Text>
                                        <TouchableOpacity>
                                            <Text className="font-[Ubuntu-Medium] text-[12px] text-[#008f58]">Show All</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <RecommendedViewComponent onItemClick={handleMealDetail} />
                                </View>
                                <View className="h-[10px]"></View>
                            </ScrollView>
                        }
                    </>
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    searchIcon: {
        tintColor: ThemeProperties.Colors.LightMode.LightText
    }
});

export default HomeViewComponent;