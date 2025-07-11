import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../../../api/axios";
import {
  Alert,
  Button,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

const HandleCreateBlogForm = () => {
  const [imgUrl, setImageUrl] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //add error states for the fields
  const [imageUrlError, setImageUrlError] = useState("");
  const [synopsisError, setSynopsisError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  //set backend errors
  const [backedError, setBackendError] = useState({
    message:"",
    state:false
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
  const { isPending, mutate } = useMutation({
    mutationKey: ["add-blog"],
    mutationFn: async (blogData: blog) => {
      const response = await axiosInstance.post("/blogs", blogData);
      const backendMessage = response.data.message;
      setBackendMessage({ message: backendMessage, state: true });
      return response.data;
    },
    onSuccess: () => {
      setBackendError({message:"", state:false});
      setContent("");
      setTitle("");
      setImageUrl("");
      setContent("");
      setSynopsis("");
      // window.location.href="/home"

      //TODO: redirect to that specific blog
    },
    onError: (error: any) => {
      let bkError = error.response?.data?.messaage;
      console.log();
      setBackendError({message:bkError, state:true});
    },
  });

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();

    imgUrl ? setImageUrlError("") : setImageUrlError("Image is required");
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
                <Alert severity="success">
                  {backendMessage.message}
                </Alert>
              )}
              
              {backedError.state &&(
                <Alert security="error">
                  {backedError.message}
                </Alert>
              )}
              
              {backendMessage.state || backedError.state && setTimeout(() => {
                setBackendMessage({ message: "", state: false });
              }, 6000)}
              <TextField
                label="image"
                variant="outlined"
                type="text"
                required
                fullWidth
                value={imgUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
                error={!!imageUrlError}
                helperText={imageUrlError}
              />
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
                rows={5}
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
                Post
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default HandleCreateBlogForm;
