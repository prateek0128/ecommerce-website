import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 6,
        p: 3,
        bgcolor: "primary.main",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <Typography variant="body2" sx={{ color: "white" }}>
        © {new Date().getFullYear()} E-Cart Store. All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ color: "white" }}>
        Built with React & MUI
      </Typography>
    </Box>
  );
};

export default Footer;
