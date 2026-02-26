import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect
} from "react";

/* ======================
   Create Context
====================== */
const CartContext = createContext();

/* ======================
   Provider
====================== */
export const CartProvider = ({ children }) => {

  /* ✅ LOAD CART FROM LOCALSTORAGE */
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  /* ✅ SAVE CART TO LOCALSTORAGE */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* ======================
     Add To Cart
  ====================== */
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find(
        (item) => item.id === product.id
      );

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  /* ======================
     Update Quantity
  ====================== */
  const updateQuantity = (id, qty) => {
    if (qty < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  /* ======================
     Remove Item
  ====================== */
  const removeItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  /* ======================
     Clear Cart
  ====================== */
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  /* ======================
     Total Price
  ====================== */
  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  /* ======================
     Total Items Count
  ====================== */
  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [cartItems]);

  /* ======================
     Provider Value
  ====================== */
  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    totalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/* ======================
   Custom Hook
====================== */
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};