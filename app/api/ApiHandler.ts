const ApiEndpoints = {
    BASE_URL: "https://www.themealdb.com/api/json/v1/1",
    CATEGORY_ENDPOINT: "/categories.php",
    SEARCH_MEAL_ENDPOINT: "/search.php?s=",
    MEAL_DETAILS_ENDPOINT: "/lookup.php?i=",
    SEARCH_MEAL_BY_CATEGORY_ENDPOINT: "/filter.php?c="
};

const fetchCategories = async () => {
    const response = await fetch(ApiEndpoints.BASE_URL + ApiEndpoints.CATEGORY_ENDPOINT);
    console.log("Fetching Categories");
    if (!response.ok) {
        throw new Error('Network respoinse was not ok');
    }
    return response.json();
};

const fetchMeal = async (mealId: string) => {
    const response = await fetch(ApiEndpoints.BASE_URL + ApiEndpoints.MEAL_DETAILS_ENDPOINT + mealId);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
};

const searchMeal = async (searchTerm: string) => {
    const response = await fetch(ApiEndpoints.BASE_URL + ApiEndpoints.SEARCH_MEAL_ENDPOINT + searchTerm);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

const searchMealByCategory = async (categoryTerm: string) => {
    const response = await fetch(ApiEndpoints.BASE_URL + ApiEndpoints.SEARCH_MEAL_BY_CATEGORY_ENDPOINT + categoryTerm);
    if (!response.ok) {
        throw new Error("Network response was not ok")
    }
    return response.json();
};

export {fetchCategories, fetchMeal, searchMeal, searchMealByCategory};