import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  quantity?: number;
  cart?: boolean;
  onRemove?: () => void;
  className?: string;
}

const ProductCard = ({
  product,
  onClick,
  cart,
  onRemove,
  quantity,
  className,
}: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} className={className}>
      <Card
        sx={{
          cursor: "pointer",
          height: "100%",
          borderRadius: 3,
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
        }}
        // onClick={() => navigate(`/product/${product.id}`)}
        onClick={onClick}
      >
        <CardMedia
          component="img"
          image={product.images[0]}
          alt={product.title}
          sx={{
            height: 300,
            objectFit: "cover",
          }}
        />

        <CardContent>
          <Typography variant="h6" gutterBottom className="headingColor">
            {product.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" className="headingColor">
              Rs.{product.price}
            </Typography>
            {cart && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    Quantity:
                  </Typography>
                  <Typography variant="body2" className="headingColor">
                    {quantity}
                  </Typography>
                </Box>
                <Tooltip title="Remove from Cart">
                  <RemoveShoppingCartRoundedIcon
                    color="primary"
                    onClick={onRemove}
                    sx={{ cursor: "pointer" }}
                  />
                </Tooltip>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;
