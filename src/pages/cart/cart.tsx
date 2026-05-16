import React, { useState } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import "../../assets/commonStyles.scss";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../commonComponents/pageHeader";
import { useCart } from "../../contexts/cartContext";
import { useToast } from "../../contexts/toastContext";
import ProductCard from "../../commonComponents/productCard";
import type { CartItem } from "../../types/cart";
const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backPath = location.state?.from ?? "/";
  const { cartItems, removeFromCart } = useCart();
  const { showToast } = useToast();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemove = (id: number) => {
    const item = cartItems.find((i) => i.product.id === id);
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
      if (item) showToast(`"${item.product.title}" removed from cart`, "info");
    }, 300);
  };
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  return (
    <Container maxWidth="xl">
      <PageHeader title="Cart" backPath={backPath} />
      <Grid
        container
        spacing={4}
        sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
        size={{ xs: 12 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h5" className="headingColor">
            Your Cart
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ({totalQuantity} {cartItems.length === 1 ? "item" : "items"})
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h5" className="headingColor">
            Price of {totalQuantity} {cartItems.length === 1 ? "item" : "items"}
            : Rs.{totalPrice}
          </Typography>
        </Box>
      </Grid>
      {cartItems.length > 0 ? (
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {cartItems.map((item: CartItem) => (
            <ProductCard
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
              cart={true}
              className={removingId === item.product.id ? "fadeOut" : ""}
              onRemove={() => handleRemove(item.product.id)}
              // onClick={() => navigate(`/product/${item.product.id}`)}
            />
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Typography variant="h5" color="textSecondary">
            Your cart is currently empty.
          </Typography>
        </Box>
      )}
    </Container>
  );
};
export default Cart;
