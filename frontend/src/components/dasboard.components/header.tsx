import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Stack,
  Typography,
  CardMedia,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const DashboardHeader = () => {
  return (
    <AppBar position="static" color="primary" sx={{ ml: 0.2, mr: 0.1 }}>
      <Stack direction="row" justifyContent="space-around" fontSize="bold">
        <Toolbar sx={{ gap: 1 }}>
          <CardMedia
            component="img"
            image="/logo2.png"
            sx={{
              borderRadius: "50%",
              objectFit: "cover",
              height: "2.5rem",
              width: "2.5rem",
            }}
          />
          <Typography sx={{ textTransform: "capitalize", fontSize: "1.5rem" }}>
            codey blogs
          </Typography>
        </Toolbar>
        <Stack
          direction={"row"}
          sx={{ display: { xs: "none", md: "flex", sm: "flex" } }}
        >
          <Toolbar>
            <Box flexDirection={"row"}>
              <Button href="/profile" color="inherit">Profile</Button>
              <Button href="/blogs" color="inherit">Blogs</Button>
            </Box>
          </Toolbar>
          <Toolbar>
            <Box>
              <Button color="inherit"> Search</Button>
              <Button color="inherit">Logout</Button>
            </Box>
          </Toolbar>
          </Stack>
          <Toolbar>
            <Stack sx={{display:{ xs:"flex", sm:"none", md:"none", xl:"none"}}}>
              <MenuIcon />
            </Stack>
          </Toolbar>
        
      </Stack>
    </AppBar>
  );
};

export default DashboardHeader;
