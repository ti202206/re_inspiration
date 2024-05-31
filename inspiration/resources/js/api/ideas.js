import axios from "axios";

const getIdeas = async () => {
    const { data } = await axios.get("/api/ideas");
    return data;
};

const getMyIdeas = async () => {
    const { data } = await axios.get("/api/my-ideas");
    return data;
};

const createIdea = async (idea) => {
    const { data } = await axios.post("/api/ideas", idea);
    return data;
};

const updateIdea = async (id, idea) => {
    const { data } = await axios.put(`/api/ideas/${id}`, idea);
    return data;
};

const deleteIdea = async (id) => {
    const { data } = await axios.delete(`/api/ideas/${id}`);
    return data;
};

const showIdea = async (id) => {
    const { data } = await axios.get(`/api/ideas/${id}`);
    return data;
};

export { getIdeas, getMyIdeas, createIdea, updateIdea, deleteIdea, showIdea };
