const { default: axios } = require("axios");
const { API_URL } = require("./config");

//created axio client to create endpoint
const axiosClient = axios.create({
  baseURL: `${API_URL}`,
});

const login = (data) => axiosClient.post("/api/login", data);
const getCartItemCount = (userId) =>
  axiosClient.get("/api/cart/" + userId + "/cartItemCount");
const addToCart = (data) => axiosClient.post("/api/cart/addToCart", data);
const getCartList = (userId) => axiosClient.get("/api/cart/find/" + userId);
const deteleCartItem = (cartItemId) =>
  axiosClient.delete("/api/cart/" + cartItemId);
const handleFavorite = (productId, data) =>
  axiosClient.post("/api/products/" + productId + "/favorites", data);
const checkUserFavourite = (userId) =>
  axiosClient.get("/api/user/" + userId + "/favorites");
const deleteProductFromFavorites = (userId, productId) =>
  axiosClient.delete("/api/user/" + userId + "/product/" + productId);
const checkout = (data) => axiosClient.post("/api/orders", data);
const getFavoriteProducts = (userId) =>
  axiosClient.get("/api/user/" + userId + "/favorites");
const getUserOrders = (userId) => axiosClient.get("/api/orders/" + userId);
export default {
  login,
  getCartItemCount,
  addToCart,
  getCartList,
  deteleCartItem,
  handleFavorite,
  checkUserFavourite,
  deleteProductFromFavorites,
  checkout,
  getFavoriteProducts,
  getUserOrders,
};
