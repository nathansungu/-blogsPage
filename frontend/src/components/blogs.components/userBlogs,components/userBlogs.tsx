import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import axiosInstance from "../../../api/axios";
import { useEffect, useState } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useNavigate } from "react-router-dom";

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

const HandleUserCard = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [blogs, setBlogs] = useState([]);
  const [operationMessage, setOperationMessage] = useState("")

  const navigate = useNavigate()

  const fetchBlogs = async () => {
    setIsLoading(true)
    const response = await axiosInstance.get("/blogs/user");
    const { data , message} = response.data;
    setBlogs(data);
    setOperationMessage(message)
    setIsLoading(false)
    return;
  };

  useEffect(() => {
    async function getBlogs() {
      try {
        await fetchBlogs();
        setError(false)
      } catch (e) {
        setError(true);
      }finally{
        setOperationMessage("")
      }
    }
    getBlogs();
  }, []);

  const deleteProduct = async (id: string) => {
    const response = await axiosInstance.delete(`/blogs/${id}`);
    await fetchBlogs();
    const { message } = response.data;
    setOperationMessage(message);
  };

  return (
    <>
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
        {operationMessage&&
        <Alert>
          {operationMessage}</Alert>}

      <Grid
        container
        columns={12}
        spacing={2}
        sx={{ backgroundColor: "background.paper", m: 1, mt: 3 }}
      >
        {blogs.map((bls: bls, ind) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ind}>
            <Tooltip title="click to view more" enterDelay={500} leaveDelay={200}>
              <Card sx={{ height: "30rem", boxShadow: 2 }} onClick={()=>{
                navigate(`/blog/${bls.id}`)
              }}>
                
                <CardMedia
                  component="img"
                  image={bls.imageUrl}
                  alt={bls.title}
                  sx={{ height: "15rem" }}
                />
                <CardContent>
                  <Stack sx={{ height: "4.6rem", overflow: "hidden" }}>
                    <Typography>{bls.synopsis}</Typography>
                  </Stack>

                  <Stack
                    direction="column"
                    sx={{ justifyContent: "center", mt: 2 }}
                  >
                    <Stack direction="row" sx={{ alignItems: "center" }}>
                      <Avatar
                        sx={{
                          backgroundColor: "primary.light",
                          height: "2.5rem",
                        }}
                      >
                        {bls.user.firstName.charAt(0)}
                        {bls.user.secondName.charAt(0)}
                      </Avatar>

                      <Stack
                        sx={{ ml: 1, width: "15rem", overflow: "hidden" }}
                        direction="row"
                        gap={1}
                      >
                        <Typography sx={{ fontWeight: 700 }}>
                          {bls.user.firstName}
                        </Typography>
                        <Typography sx={{ fontWeight: 700 }}>
                          {bls.user.secondName}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack
                      direction="column"
                      sx={{ m: 1, justifyContent: "center" }}
                    >
                      <Stack
                        direction="row"
                        sx={{ mt: 1, alignContent: "center", gap: 1 }}
                      >
                        <CalendarMonthOutlinedIcon />
                        <Typography fontWeight="600">
                          {" "}
                          {bls.createdAt.slice(0, 10)}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        sx={{ m: 1 }}
                        spacing={2}
                        width={"5rem"}
                      >
                        <Button
                          variant="contained"
                          href={`/update/blog/${bls.id}`}
                        >
                          Update
                        </Button>
                        <Button
                          color="warning"
                          variant="contained"
                          onClick={() => deleteProduct(bls.id)}
                        >
                          <Typography>Delete</Typography>
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HandleUserCard;
