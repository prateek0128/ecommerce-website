import "./App.css";
import Home from "./pages/home/home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProductDetails from "./pages/products/productDetails";
import Navbar from "./commonComponents/navbar";
import { Container } from "@mui/material";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Cart from "./pages/cart/cart";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Container maxWidth="xl">
        <Navbar
          title="E-Cart Store"
          rightIcon={
            <ShoppingCartOutlinedIcon
            // onClick={() => navigate("/cart")}
            // sx={{ cursor: "pointer" }}
            />
          }
          onCartClick={() => navigate("/cart", { state: { from: location.pathname } })}
        />
      </Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
