import {
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
  createdAt: Date;
};
const HandleCard = () => {
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const response = await axiosInstance.get("/blogs");
    const { blogs } = response.data;
    console.log(blogs);
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
      <Grid container columns={12} sx={{ backgroundColor: "background.paper" }}>
        <Stack sx={{gap:2, m:2}}>
          {blogs.map((bls: bls) => (
            <Grid size={{ xs: 12, sm: 6, md: 4}}>
              <Card  sx={{height:"30rem" , boxShadow:2}}>
                <CardMedia
                  component="img"
                  image={bls.imageUrl}
                  alt={bls.title}
                  sx={{height:"15rem"}}
                />
                <CardContent>
                  <Typography>{bls.synopsis}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Stack>
      </Grid>
    </>
  );
};

export default HandleCard;
