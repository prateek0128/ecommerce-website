import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Grid,
  Button,
} from "@mui/material";
import axios from "axios";
import "./home.scss";
import "../../assets/commonStyles.scss";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product";
import ProductCard from "../../commonComponents/productCard";
const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products",
      );
      console.log("Products Response:", response);
      const data = response.data;
      setFeaturedProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h3" gutterBottom className="headingColor">
              Welcome to the E-Commerce Store!
            </Typography>
            <Typography variant="body1">
              Explore our wide range of products and enjoy seamless shopping
              experience.
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ mt: 4 }}
              className="headingColor"
            >
              Featured Products
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {featuredProducts.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  alignSelf: "center",
                  mt: 4,
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              featuredProducts.map((product: Product) => (
                // <Grid
                //   size={{ xs: 12, sm: 4, md: 3 }}
                //   key={product.id}
                //   className="productCard"
                //   onClick={() => {
                //     navigate(`/product/${product.id}`);
                //   }}
                // >
                //   <Box
                //     component="img"
                //     src={product.images[0]}
                //     alt="Product"
                //     sx={{
                //       width: { xs: "100%" },
                //       height: "300px",
                //       borderRadius: 2,
                //     }}
                //   />
                //   <Box>
                //     <Typography variant="h6" className="headingColor">
                //       {product.title}
                //     </Typography>
                //     <Typography variant="h5" className="headingColor">
                //       ${product.price}
                //     </Typography>
                //   </Box>
                // </Grid>
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                  }}
                />
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
