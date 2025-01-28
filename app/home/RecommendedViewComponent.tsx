import { FlatList, Text, TouchableOpacity, View } from "react-native";
import CategoryViewComponent from "./CategoryViewComponent";
import MealCardViewComponent from "./MealCardViewComponent";

const RecommendedViewComponent = ({ onItemClick }) => {
    const items: {mealId: string, name: string, area: string, thumbnailURL: string}[] = [
        {mealId: "52945", name: "Kung Pao Chicken", area: "Chinese", thumbnailURL: "https://www.themealdb.com/images/media/meals/1525872624.jpg"},
        {mealId: "52813", name: "Kentucky Fried Chicken", area: "American", thumbnailURL: "https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg"},
        {mealId: "52795", name: "Chicken Handi", area: "Indian", thumbnailURL: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg"},
        {mealId: "52777", name: "Mediterranean Pasta Salad", area: "Italian", thumbnailURL: "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg"},
        {mealId: "53018", name: "Bigos (Hunters Stew)", area: "Polish", thumbnailURL: "https://www.themealdb.com/images/media/meals/md8w601593348504.jpg"},
        {mealId: "52979", name: "Bitterballen (Dutch meatballs)", area: "Dutch", thumbnailURL: "https://www.themealdb.com/images/media/meals/lhqev81565090111.jpg"}
    ];
    return (
            <FlatList
                scrollEnabled={false}
                className="mt-4"
                data={items}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({item}) => (
                    <TouchableOpacity className="flex-1 items-center" onPress={() => onItemClick(item["mealId"])}>
                        <MealCardViewComponent mealId={item["mealId"]} mealName={item["name"]} area={item["area"]} thumbnailURL={item["thumbnailURL"]} />
                    </TouchableOpacity>
                )}
            />
    );
};

export default RecommendedViewComponent;