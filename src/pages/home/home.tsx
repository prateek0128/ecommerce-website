import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Pagination,
  TextField,
} from "@mui/material";
import axios from "axios";
import "./home.scss";
import "../../assets/commonStyles.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Product } from "../../types/product";
import ProductCard from "../../commonComponents/productCard";
const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allCategories, setAllCategories] = useState<
    { categoryName: string; slug: string }[]
  >([]);
  const PAGE_SIZE = 10;
  const filters: string[] = searchParams.getAll("category");
  const sort = searchParams.get("sort") || "";
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Name: A to Z", value: "name_asc" },
    { label: "Name: Z to A", value: "name_desc" },
  ];
  const getAllProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products",
      );
      console.log("Products Response:", response);
      setFeaturedProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProductsByCategories = async (slugs: string[]) => {
    try {
      setIsLoading(true);
      const responses = await Promise.all(
        slugs.map((slug) =>
          axios.get(
            `https://api.escuelajs.co/api/v1/products/?categorySlug=${slug}`,
          ),
        ),
      );
      const allProducts: Product[] = responses.flatMap((res) => res.data);
      const uniqueProducts = allProducts.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.id === product.id),
      );
      setFeaturedProducts(uniqueProducts);
    } catch (error) {
      console.error("Error fetching products by category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/categories",
      );
      console.log("Categories Response:", response);
      const cats = response.data.map((cat: any) => ({
        categoryName: cat.name,
        slug: cat.slug,
      }));
      setAllCategories(cats);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (filters.length > 0) {
      getProductsByCategories(filters);
    } else {
      getAllProducts();
    }
  }, [searchParams]);

  const handleFilterChange = (e: any) => {
    const selected: string[] = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("page");
    selected.forEach((slug) => params.append("category", slug));
    setSearchParams(params);
  };

  const handleSortChange = (e: any) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    setSearchParams(params);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    params.delete("page");
    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(value));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getFilteredAndSortedProducts = () => {
    const normalizedSearch = search.trim().toLowerCase();
    const filteredProducts = normalizedSearch
      ? featuredProducts.filter((product) =>
          product.title.toLowerCase().includes(normalizedSearch) ||
          String(product.price).includes(normalizedSearch),
        )
      : featuredProducts;
    const products = [...filteredProducts];
    if (sort === "price_asc") return products.sort((a, b) => a.price - b.price);
    if (sort === "price_desc")
      return products.sort((a, b) => b.price - a.price);
    if (sort === "name_asc")
      return products.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "name_desc")
      return products.sort((a, b) => b.title.localeCompare(a.title));
    return products;
  };

  const getPagedProducts = () => {
    const sorted = getFilteredAndSortedProducts();
    return sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  };

  const totalProducts = getFilteredAndSortedProducts().length;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

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
              <Typography variant="body1">Sort</Typography>
              <Select
                value={sort}
                onChange={handleSortChange}
                size="small"
                displayEmpty
                sx={{ width: { xs: "100%", sm: 180 } }}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="body1">Filter</Typography>
              <Select
                multiple
                value={filters}
                onChange={handleFilterChange}
                input={<OutlinedInput size="small" />}
                displayEmpty
                renderValue={(selected) =>
                  selected.length === 0
                    ? "All"
                    : allCategories
                        .filter((category) => selected.includes(category.slug))
                        .map((category) => category.categoryName)
                        .join(", ")
                }
                sx={{ width: { xs: "100%", sm: 240 } }}
              >
                {allCategories.map((category, index) => (
                  <MenuItem key={index} value={category.slug}>
                    <Checkbox checked={filters.includes(category.slug)} />
                    <ListItemText primary={category.categoryName} />
                  </MenuItem>
                ))}
              </Select>
              <TextField
                value={search}
                onChange={handleSearchChange}
                size="small"
                placeholder="Search products"
                sx={{ width: { xs: "100%", sm: 220 } }}
              />
            </Box>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {isLoading ? (
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
            ) : totalProducts === 0 ? (
              <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
                <Typography variant="body1">No products found.</Typography>
              </Box>
            ) : (
              getPagedProducts().map((product: Product) => (
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
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
