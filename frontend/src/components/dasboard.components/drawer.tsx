import {
  Box,
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  Toolbar,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";

import React from "react";
import axiosInstance from "../../api/axios";
import useUserStore from "../../store/userStates";
import { useNavigate } from "react-router-dom";

function HandleDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { logout } = useUserStore();

  const logoutFc = async () => {
    await axiosInstance.get("/auth/logout");
    logout();
    navigate("/");
  };

  const toggleDrawer = (inOpen: boolean) => () => {
    setOpen(inOpen);
  };

  return (
    <Box sx={{ display: "flex", zIndex: 20 }}>
      <Toolbar>
        <Stack >
           <Button
          variant="outlined"
          sx={{ width: "2rem" }}
          onClick={toggleDrawer(true)}
          color="secondary"
        >
          <MenuIcon />
        </Button>

        </Stack>
       
      </Toolbar>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Divider />
          <List>
            {[
              { name: "Profile", link: "/profile" },
              { name: "My Blogs", link: "/blogs" },
              { name: "Add Blog", link: "/add-blog" },
            ].map((dst, ind) => (
              <ListItem key={ind}>
                <Button component={Link} to={dst.link}>
                  {dst.name}
                </Button>
              </ListItem>
            ))}
            <ListItem>
              <Button onClick={logoutFc}>Logout</Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default HandleDrawer;
