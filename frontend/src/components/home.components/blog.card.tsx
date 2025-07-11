import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";

type bls = {
  id: string;
  imageUrl: string;
  title: string;
  synopsis: string;
  content: string;
  createdAt: string;
  user: {
    firstName: string;
    secondName: string;
  };
};
const HandleCard = () => {
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const response = await axiosInstance.get("/blogs");
    const { blogs } = response.data;
    setBlogs(blogs);
    return;
  };

  useEffect(() => {
    async function getBlogs() {
      try {
        fetchBlogs();
      } catch (e) {
        setError("Ooops! Something went Wrong");
      }
    }
    getBlogs();
  }, []);

  return (
    <>
      <Grid
        container
        columns={12}
        spacing={2}
        sx={{ backgroundColor: "background.paper" , m:1, mt:3}}
      >
        {blogs.map((bls: bls, ind) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ind}>
            <Card sx={{ height: "25rem", boxShadow: 2 }}>
              <CardMedia
                component="img"
                image={bls.imageUrl}
                alt={bls.title}
                sx={{ height: "15rem" }}
              />
              <CardContent>
                <Stack sx={{height:"4.6rem", overflow:"hidden"}}><Typography>{bls.synopsis}</Typography></Stack>
              
                <Stack direction="row" sx={{ alignItems: "center", mt:2 }}>
                  <Avatar>
                    {bls.user.firstName.charAt(0)}
                    {bls.user.secondName.charAt(0)}
                  </Avatar>

                  <Stack sx={{ml:2}}direction="row" gap={2}>
                    <Typography>{bls.user.firstName}</Typography>
                    <Typography>{bls.user.secondName}</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ ml: 1, alignItems:"center" }}>
                    
                    <Typography> {bls.createdAt.slice(0, 10)}</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HandleCard;
