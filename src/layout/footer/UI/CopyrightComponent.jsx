import { Link, Typography } from "@mui/material";

const CopyrightComponent = ({ isDarkTheme, ...props }) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
      sx={{ color: isDarkTheme ? "#000" : "white" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Yaniv Zinger{" "}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default CopyrightComponent;
