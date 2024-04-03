const { default: axios } = require("axios");
const { API_URL } = require("./config");

const axiosClient = axios.create({
  baseURL: `${API_URL}`,
});

// gọi api
// Api User
const login = (data) => axiosClient.post("/api/login", data);

const register = (data) => axiosClient.post("/api/register", data);

const updateProfileUser = (userId, data) =>
  axiosClient.put("/api/user/" + userId + "/updateProfile", data);

// Api Category
const getCategoryList = () => axiosClient.get("/api/category");

// Api Product
const getProductList = () => axiosClient.get("/api/products");

const searchProduct = (searchKey) =>
  axiosClient.get("/api/products/search/" + searchKey);

const getProductByCategory = (categoryId) =>
  axiosClient.get("/api/products/category/" + categoryId);

// Api Cart
const getCartItemCount = (userId) =>
  axiosClient.get("/api/cart/" + userId + "/cartItemCount");

const addToCart = (data) => axiosClient.post("/api/cart/addToCart", data);

const getCartList = (userId) => axiosClient.get("/api/cart/find/" + userId);

const deteleCartItem = (cartItemId) =>
  axiosClient.delete("/api/cart/" + cartItemId);

const updateQuantityCart = (data) =>
  axiosClient.put("/api/cart/updateQuantity", data);

// Api Favorite
const handleFavorite = (productId, data) =>
  axiosClient.post("/api/products/" + productId + "/favorites", data);

const checkUserFavourite = (userId) =>
  axiosClient.get("/api/user/" + userId + "/favorites");

const deleteProductFromFavorites = (userId, productId) =>
  axiosClient.delete("/api/user/" + userId + "/product/" + productId);

const getFavoriteProducts = (userId) =>
  axiosClient.get("/api/user/" + userId + "/favorites");

// Api Order
const checkout = (data) => axiosClient.post("/api/orders", data);
const getUserOrders = (userId) => axiosClient.get("/api/orders/" + userId);

export default {
  login,
  register,
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
  updateQuantityCart,
  getProductList,
  updateProfileUser,
  getCategoryList,
  getProductByCategory,
  searchProduct,
};
