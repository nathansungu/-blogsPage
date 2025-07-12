import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../../../api/axios";
import { Button, Grid, Stack, TextField } from "@mui/material";

const HandleCreateBlogForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //add error states for the fields
  const [imageUrlError, setImageUrlError] = useState("");
  const [synopsisError, setSynopsisError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");


  type blog = {
    imageUrl: string;
    synopsis: string;
    title: string;
    content: string;
  };
  const { isPending, isError, mutate } = useMutation({
    mutationKey: ["add-blog"],
    mutationFn: async (blogData: blog) => {
      const response = await axiosInstance.post("/blogs", blogData);
      return response.data;
    },
  });

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    imageUrl? setImageUrlError("") : setImageUrlError("Image is required");
    synopsis ? setSynopsisError("") : setSynopsisError("Synopsis is required");
    title ? setTitleError("") : setTitleError("Title is required");
    content ? setContentError("") : setContentError("Content is required");
    const blogData = {
      imageUrl,
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
            <Stack gap={2} sx={{ border: "1px solid #000",borderRadius:2, padding: "2rem" }}>
              <TextField
                label="imageUrl"
                variant="outlined"
                type="text"
                required
                fullWidth
                value={imageUrl}
                
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
