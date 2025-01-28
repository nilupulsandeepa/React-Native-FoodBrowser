import { Image, Text, View } from "react-native";

const MealCardViewComponent = ({mealId, mealName, area, thumbnailURL}) => {
    return (
        <View className="mt-2 w-[150px]">
            <Image className="w-[150px] h-[170px] rounded-2xl" source={{uri: thumbnailURL}} />
            <Text className="mt-2 font-[Ubuntu-Medium] text-[14px]">{mealName}</Text>
            <Text className="mt-1 font-[Ubuntu-Regular] text-[12px] text-[#898989]">{area}</Text>
        </View>
    );
};

export default MealCardViewComponent;