import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Grid,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import "../../assets/commonStyles.scss";
import axios from "axios";
import { Form, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../commonComponents/pageHeader";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import type { Product } from "../../types/product";
import { useCart } from "../../contexts/cartContext";
const ProductDetails = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();
  const [productData, setProductData] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/${id}`,
      );
      setProductData(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  return (
    <Container maxWidth="xl">
      <PageHeader title="Product Details" backPath="/" />
      {!productData ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={productData.images[0]}
              alt={productData.title}
              sx={{ width: "100%", borderRadius: 2 }}
            />
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h4" className="headingColor">
                {productData.title}
              </Typography>
              <Typography variant="h5" color="textSecondary">
                ${productData.price}
              </Typography>
              <Typography variant="body1">{productData.description}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 4,
                width: "fit-content",
              }}
            >
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="size-select-label">Quantity</InputLabel>
                <Select
                  value={quantity}
                  label="Quantity"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <MenuItem key={num} value={num}>
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<AddShoppingCartRoundedIcon />}
                onClick={() => {
                  //navigate("/cart");
                  addToCart(productData, quantity);
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};
export default ProductDetails;
