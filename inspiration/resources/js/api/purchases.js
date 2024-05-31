import axios from "axios";

const getPurchases = async () => {
    const { data } = await axios.get("/api/purchases");
    return data;
};

const createPurchase = async (purchase) => {
    const { data } = await axios.post("/api/purchases", purchase);
    return data;
};

const updatePurchase = async (id, purchase) => {
    const { data } = await axios.patch(`/api/purchases/${id}`, purchase);
    return data;
};

const getReviewedPurchases = async () => {
    const { data } = await axios.get("/api/reviewed-purchases");
    return data;
};

const getAllReviews = async () => {
    const { data } = await axios.get("/api/reviews");
    return data;
};

export { getPurchases, createPurchase, updatePurchase, getReviewedPurchases, getAllReviews };
