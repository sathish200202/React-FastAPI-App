import React, { useEffect, useState } from "react";
import AddToCart from "../components/AddToCart";
import { useNavigate } from "react-router-dom";
import { userCartStore } from "../stores/usecartStore";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";

const AddToCartPage = () => {
  const { cart, getCart, loading, updateCart, removeFromCart } =
    userCartStore();
  const { user, checkAuth } = useUserStore();
  const navigate = useNavigate();
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const shippingPrice = 20;

  useEffect(() => {
    const fetchUser = async () => {
      await checkAuth();
      setIsLoadingUser(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!isLoadingUser && !user) {
      toast.error("Please login to view your cart.");
      navigate("/login");
    } else if (!isLoadingUser && user) {
      getCart();
    }
  }, [user, isLoadingUser]);

  const handleIncrease = async (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      await updateCart(item.id, item.quantity + 1);
    }
  };

  const handleDecrease = async (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      if (item.quantity <= 1) {
        await removeFromCart(item.id);
        toast.success(`${item.product.product_name} removed from cart.`);
      } else {
        await updateCart(item.id, item.quantity - 1);
      }
    }
  };

  const handleRemove = async (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      await removeFromCart(item.id);
      toast.success(`${item.product.product_name} removed from cart.`);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.product?.price * item.quantity,
    0
  );

  return (
    <AddToCart
      cart={cart}
      loading={loading || isLoadingUser}
      handleIncrease={handleIncrease}
      handleDecrease={handleDecrease}
      handleRemove={handleRemove}
      shippingPrice={shippingPrice}
      totalPrice={totalPrice}
    />
  );
};

export default AddToCartPage;
