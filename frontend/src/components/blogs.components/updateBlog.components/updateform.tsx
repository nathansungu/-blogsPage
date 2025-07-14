import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axios";
import {
  Alert,
  Button,
  CardMedia,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";

const HandleUpdateBlogForm = () => {
  // blog details
  const [imgUrl, setImageUrl] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //add error states for the fields
  const [synopsisError, setSynopsisError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [error, setError] = useState("");

  //set backend errors
  const [backedError, setBackendError] = useState({
    message: "",
    state: false,
  });
  const [backendMessage, setBackendMessage] = useState({
    message: "",
    state: false,
  });

  type blog = {
    imgUrl: string;
    synopsis: string;
    title: string;
    content: string;
  };
  //fetch product

  const { id } = useParams<{ id: string }>();
  const fetchBlogs = async () => {
    const blogs = await axiosInstance.get(`/blogs/${id}`);
    const { blog } = blogs.data;
    setImageUrl(blog!.imageUrl);
    setSynopsis(blog!.synopsis);
    setTitle(blog!.title);
    setContent(blog!.content);

    return;
  };

  useEffect(() => {
    async function getData() {
      try {
        fetchBlogs();
      } catch (e) {
        setError("Oops! Failed To Update Product");
        window.location.href = "/blogs";
        alert(error);
      }
    }
    getData();
  }, []);

  const { isPending, mutate } = useMutation({
    mutationKey: ["add-blog"],
    mutationFn: async (blogData: blog) => {
      const response = await axiosInstance.patch(`/blogs/${id}`, blogData);
      const backendMessage = response.data.message;
      setBackendMessage({ message: backendMessage, state: true });
      return response.data;
    },
    onSuccess: () => {
      setBackendError({ message: "", state: false });
      setContent("");
      setTitle("");
      setImageUrl("");
      setContent("");
      setSynopsis("");
      window.location.href = "/blogs";
    },
    onError: (error: any) => {
      let bkError = error.response?.data?.messaage;
      console.log();
      setBackendError({ message: bkError, state: true });
    },
  });

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();

    synopsis ? setSynopsisError("") : setSynopsisError("Synopsis is required");
    title ? setTitleError("") : setTitleError("Title is required");
    content ? setContentError("") : setContentError("Content is required");
    const inputError = !imgUrl || !synopsis || !title || !content;
    if (inputError) {
      return;
    }
    const blogData = {
      imgUrl,
      synopsis,
      title,
      content,
    };
    mutate(blogData);
  };
  return (
    <>
      <Grid
        container
        columns={12}
        sx={{ alignContent: "center", justifyContent: "center", mt: "2rem" }}
      >
        <Grid size={{ sm: 8, md: 6, xs: 10 }}>
          <form>
            <Stack
              gap={2}
              sx={{
                border: "1px solid #000",
                borderRadius: 2,
                padding: "2rem",
              }}
            >
              {backendMessage.state && (
                <Alert severity="success">{backendMessage.message}</Alert>
              )}

              {backedError.state && (
                <Alert security="error">{backedError.message}</Alert>
              )}

              <CardMedia component="img" image={imgUrl} sx={{height:"20rem"}}/>

              <TextField
                label="title"
                variant="outlined"
                type="text"
                required
                fullWidth
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                error={!!titleError}
                helperText={titleError}
              />
              <TextField
                label="synopsis"
                variant="outlined"
                type="text"
                required
                fullWidth
                multiline
                rows={2}
                value={synopsis}
                onChange={(e) => {
                  setSynopsis(e.target.value);
                }}
                error={!!synopsisError}
                helperText={synopsisError}
              />
              <TextField
                label="content"
                variant="outlined"
                type="text"
                required
                fullWidth
                multiline
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                error={!!contentError}
                helperText={contentError}
              />
              <Button
                type="submit"
                color="primary"
                loading={isPending}
                sx={{ backgroundColor: "#3f51b5" }}
                onClick={handleForm}
              >
                Update
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default HandleUpdateBlogForm;
