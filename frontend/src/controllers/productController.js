import products from "../models/Product";

export const getAllProducts = () => {
  return products;
};

export const getProductById = (id) => {
  return products.find((product) => product.id === parseInt(id));
};