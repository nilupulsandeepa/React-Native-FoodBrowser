import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FavoriteItem = { id: string, name: string, area: string, category: string, url: string };
export type FavoriteState = {
    favoriteMeals: FavoriteItem[],
    addFavorite: (favoriteMeal: FavoriteItem) => void,
    removeFavoriteById: (id: string) => void
}

const useAppStateStore = create(
    persist(
        (set) => ({
            favoriteMeals: [],
            addFavorite: (favoriteMeal: FavoriteItem) =>
                set((state: FavoriteState) => ({
                    favoriteMeals: [...state.favoriteMeals, favoriteMeal]
                })),
            removeFavoriteById: (id: string) =>
                set((state: FavoriteState) => ({
                    favoriteMeals: state.favoriteMeals.filter((favorite: FavoriteItem) => favorite.id !== id)
                }))
        }),
        {
            name: 'favoriteMealsStorage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useAppStateStore;