import { Box, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useLocation } from "react-router-dom";

type NavbarProps = {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onCartClick?: () => void;
};

const Navbar = ({
  title,
  leftIcon = <ShoppingCartOutlinedIcon />,
  rightIcon,
  onCartClick,
}: NavbarProps) => {
  return (
    <Box
      sx={{
        mt: 4,
        p: 2,
        borderRadius: 2,
        bgcolor: "primary.main",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ color: "white", display: "flex" }}>{leftIcon}</Box>

        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      </Box>

      {useLocation().pathname !== "/cart" && (
        <Box
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={onCartClick}
        >
          {rightIcon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            Cart
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
