import AsyncStorage from "@react-native-async-storage/async-storage";
import useAppStateStore, {FavoriteItem} from "../state/StateStore";

jest.mock("@react-native-async-storage/async-storage")

describe("Zustand Store Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useAppStateStore.persist.clearStorage();
        useAppStateStore.setState({ favoriteMeals: []});
    });

    it("Should add a favorite meal and persist it", async () => {
        const {addFavorite} = useAppStateStore.getState();

        const newFavorite: FavoriteItem = {
            id: "12345",
            name: "Chicken Fried Rice",
            area: "Sri Lanka",
            category: "Lunch",
            url: "https://mysite.com/example.jpg"
        };

        addFavorite(newFavorite);

        const updatedState = useAppStateStore.getState();
        expect(updatedState.favoriteMeals).toHaveLength(1);
        expect(updatedState.favoriteMeals[0]).toEqual(newFavorite);

        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
            "favoriteMealsStorage",
            expect.stringContaining('"favoriteMeals":[{"id":')
        );
    }); 

    it("Should load persisted data", async () => {
        (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
            JSON.stringify({state: {favoriteMeals: [{id: "2", name: "Burger"}]}})
        );

        await useAppStateStore.persist.rehydrate();

        const updatedState = useAppStateStore.getState();
        expect(updatedState.favoriteMeals).toHaveLength(1);
        expect(updatedState.favoriteMeals[0]).toEqual({id: "2", name: "Burger"});
    });

    it("Should remove a favorite meal and update persisted data", async () => {
        const { addFavorite, removeFavoriteById } = useAppStateStore.getState();

        const newFavorite: FavoriteItem = {
            id: "1",
            name: "Pizza",
            area: "Italian",
            category: "Fast Food",
            url: "http://example.com/pizza.jpg"
        };

        addFavorite(newFavorite);
        removeFavoriteById("1");

        const updatedState = useAppStateStore.getState();
        expect(updatedState.favoriteMeals).toHaveLength(0);

        expect(AsyncStorage.setItem).toHaveBeenCalledWith(
            "favoriteMealsStorage",
            expect.stringContaining('"favoriteMeals":[]')
        );
    })
});