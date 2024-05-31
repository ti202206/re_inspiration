import axios from "axios";

const getUser = async () => {
    const { data } = await axios.get("/api/user");
    return data;
};

const login = async ({ email, password }) => {
    const { data } = await axios.post("/api/login", { email, password });
    return data;
};

const logout = async () => {
    const { data } = await axios.post("/api/logout");
    return data;
};

export { getUser, login, logout };
