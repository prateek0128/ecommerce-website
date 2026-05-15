import { Box, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useNavigate } from "react-router-dom";

type PageHeaderProps = {
  title: string;
  backPath?: string;
};

const PageHeader = ({ title, backPath = "/" }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        alignItems: "center",
        gap: 2,
        cursor: "pointer",
      }}
      onClick={() => navigate(backPath)}
    >
      <ArrowBackIosNewRoundedIcon sx={{ color: "#000" }} />

      <Typography variant="h4" className="headingColor">
        {title}
      </Typography>
    </Box>
  );
};

export default PageHeader;
