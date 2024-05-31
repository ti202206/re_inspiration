import axios from "axios";

const getFavorites = async () => {
    const { data } = await axios.get("/api/favorites");
    return data;
};

const toggleFavorite = async (ideaId) => {
    const { data } = await axios.post("/api/favorites/toggle", { idea_id: ideaId });
    return data;
};

export { getFavorites, toggleFavorite };
