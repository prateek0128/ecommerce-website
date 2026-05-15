import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Grid,
  Button,
  Select,
  MenuItem,
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
  const [filter, setFilter] = useState<string>("Select a category");

  const data = [
    {
      id: 1,
      title: "Majestic Mountain Graphic T-Shirt",
      slug: "majestic-mountain-graphic-t-shirt",
      price: 44,
      description:
        "Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.",
      category: {
        id: 1,
        name: "Clothes",
        slug: "clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2026-05-15T18:06:07.000Z",
        updatedAt: "2026-05-15T18:06:07.000Z",
      },
      images: [
        "https://i.imgur.com/QkIa5tT.jpeg",
        "https://i.imgur.com/jb5Yu0h.jpeg",
        "https://i.imgur.com/UlxxXyG.jpeg",
      ],
      creationAt: "2026-05-15T18:06:07.000Z",
      updatedAt: "2026-05-15T18:06:07.000Z",
    },
    {
      id: 2,
      title: "Classic Red Pullover Hoodie",
      slug: "classic-red-pullover-hoodie",
      price: 10,
      description:
        "Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.",
      category: {
        id: 1,
        name: "Clothes",
        slug: "clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2026-05-15T18:06:07.000Z",
        updatedAt: "2026-05-15T18:06:07.000Z",
      },
      images: [
        "https://i.imgur.com/1twoaDy.jpeg",
        "https://i.imgur.com/FDwQgLy.jpeg",
        "https://i.imgur.com/kg1ZhhH.jpeg",
      ],
      creationAt: "2026-05-15T18:06:07.000Z",
      updatedAt: "2026-05-15T18:06:07.000Z",
    },
    {
      id: 3,
      title: "Classic Heather Gray Hoodie",
      slug: "classic-heather-gray-hoodie",
      price: 69,
      description:
        "Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.",
      category: {
        id: 1,
        name: "Clothes",
        slug: "clothes",
        image: "https://i.imgur.com/QkIa5tT.jpeg",
        creationAt: "2026-05-15T18:06:07.000Z",
        updatedAt: "2026-05-15T18:06:07.000Z",
      },
      images: [
        "https://i.imgur.com/cHddUCu.jpeg",
        "https://i.imgur.com/CFOjAgK.jpeg",
        "https://i.imgur.com/wbIMMme.jpeg",
      ],
      creationAt: "2026-05-15T18:06:07.000Z",
      updatedAt: "2026-05-15T18:06:07.000Z",
    },
  ];
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
  const allCategories = featuredProducts
    .map((product: Product) => {
      return {
        categoryName: product.category.name,
        slug: product.category.slug,
      };
    })
    .filter(
      (category: any, index: any, self: any) =>
        index ===
        self.findIndex(
          (cat: any) => cat.categoryName === category.categoryName,
        ),
    );
  console.log("allCategories=>", allCategories);

  const handleFilter = () => {};
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 2,
                mb: 2,
              }}
            >
              <Typography variant="body1">Filter</Typography>
              <Select value={filter} defaultValue="Select a category">
                {allCategories.map((category: any, index: any) => (
                  <MenuItem key={index} value={category.categoryName}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </Box>
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
