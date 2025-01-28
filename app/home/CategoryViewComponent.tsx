import { Image, Text, View } from "react-native";

const CategoryViewComponent = ({categoryName, categoryThumbURL, isSelected}) => {
    return (
        <View className="p-1 w-[90px] h-[90px]">
            <View className={`flex-1 flex-col items-center justify-center rounded-2xl ${isSelected ? "bg-[#008f58]" : "bg-[#ffffff]"}`}>
                <Image className="w-[40px] h-[40px]" source={{uri: categoryThumbURL}} style={[{resizeMode: 'contain'}]} />
                <Text className={`font-[Ubuntu-Regular] text-[12px] ${isSelected ? "text-[#ffffff]" : "text-[#000000]"}`}>{categoryName}</Text>
            </View>
        </View>
    );
};

export default CategoryViewComponent;