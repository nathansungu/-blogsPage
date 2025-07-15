import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HandleFooter from "../footer";

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
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigetor = useNavigate();

  const fetchBlogs = async () => {
    setIsLoading(true);
    const response = await axiosInstance.get("/blogs");
    const { blogs } = response.data;
    setBlogs(blogs);
    setIsLoading(false);
    return;
  };

  useEffect(() => {
    async function getBlogs() {
      try {
        fetchBlogs();
        setError(false);
      } catch (e) {
        setError(true);
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
        sx={{ backgroundColor: "background.paper", m: 1, mt: 3 , height:"100vh", overflow:"scroll"}}
      >
        {error && (
          <Stack
            sx={{ mt: "50%", justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                color: "red",
                fontSize: "1.5rem",
              }}
            >
              failed to fetch feeds
            </Typography>
          </Stack>
        )}
        {isLoading && (
          <Stack
            sx={{ width: "100%", height: "50vh", justifyContent: "center" }}
          >
            <Typography
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                color: "green",
                fontSize: "1.5rem",
              }}
            >
              loading feeds, please wait ...
            </Typography>
          </Stack>
        )}
     
          {blogs.map((bls: bls, ind) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ind}>
              <Tooltip title="Click To View More">
                <Card
                  sx={{ height: "30rem", boxShadow: 2 }}
                  onClick={() => {
                    navigetor(`/blog/${bls.id}`);
                  }}
                >
                  <CardMedia
                    component="img"
                    image={bls.imageUrl}
                    alt={bls.title}
                    sx={{ height: "15rem" }}
                  />
                  <CardContent>
                    <Stack>
                      <Typography
                        sx={{ textTransform: "capitalize", fontSize: "1.5rem" }}
                      >
                        {bls.title}
                      </Typography>
                    </Stack>
                    <Stack sx={{ height: "4.6rem", overflow: "hidden" }}>
                      <Typography>{bls.synopsis}</Typography>
                    </Stack>

                    <Stack direction="row" sx={{ alignItems: "center", mt: 2 }}>
                      <Avatar sx={{ backgroundColor: "grey" }}>
                        {bls.user.firstName.charAt(0)}
                        {bls.user.secondName.charAt(0)}
                      </Avatar>

                      <Stack sx={{ ml: 2 }} direction="row" gap={2}>
                        <Typography sx={{ fontSize: "1.3rem" }}>
                          {bls.user.firstName}
                        </Typography>
                        <Typography sx={{ fontSize: "1.3rem" }}>
                          {bls.user.secondName}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        sx={{ ml: 1, alignItems: "center" }}
                      >
                        <Typography> {bls.createdAt.slice(0, 10)}</Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Tooltip>
            </Grid>
          ))}
      </Grid>
      <HandleFooter/>
    </>
  );
};

export default HandleCard;
