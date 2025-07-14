import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axiosInstance from "../../../api/axios";
import { Alert, Button, Grid, Stack, TextField } from "@mui/material";
import axios from "axios";
type blog = {
    imgUrl: string;
    synopsis: string;
    title: string;
    content: string;
  };

const HandleCreateBlogForm = () => {
  const [img, setImage] = useState<File | null>(null);
  const [synopsis, setSynopsis] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //add error states for the fields
  const [imageUrlError, imageError] = useState("");
  const [synopsisError, setSynopsisError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const [isLoding, setIsloading] = useState(false);

  //set backend errors
  const [backedError, setBackendError] = useState({
    message: "",
    state: false,
  });
  const [backendMessage, setBackendMessage] = useState({
    message: "",
    state: false,
  });

  
  const { isPending, mutate } = useMutation({
    mutationKey: ["add-blog"],
    mutationFn: async (blogData: blog) => {
      const response = await axiosInstance.post("/blogs", blogData);
      const backendMessage = response.data.message;
      setBackendMessage({ message: backendMessage, state: true });
      return response.data;
    },
    onSuccess: () => {
      setBackendError({ message: "", state: false });
      setContent("");
      setTitle("");
      setImage(null);
      setContent("");
      setSynopsis("");
      window.location.href = "/blogs";
    },
    onError: (error: any) => {
      let bkError = error.response?.data?.messaage;
      console.log(bkError);
      setBackendError({ message: bkError, state: true });
    },
  });
  const uploadImage = async () => {
    if (!img) {
      imageError("Image is required");
      return null;
    }

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "codeyblogs");

    try {
      setIsloading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgmbv5dfg/image/upload",
        formData
      );
      const url = response.data.secure_url;
      
      return url;
    } catch (error) {
      imageError("Failed to upload image");
      return null;
    } finally {
      setIsloading(false);
    }
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = !img || !synopsis || !title || !content;
    imageError(img ? "" : "Image is required");
    setSynopsisError(synopsis ? "" : "Synopsis is required");
    setTitleError(title ? "" : "Title is required");
    setContentError(content ? "" : "Content is required");

    if (hasErrors) return;

    const uploadedUrl = await uploadImage();
    if (!uploadedUrl) return;

    const blogData = {
      imgUrl: uploadedUrl,
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
              {imageUrlError && <Alert security="error">{imageUrlError}</Alert>}

              <input
                name="Image"
                type="file"
                required
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImage(file);
                }}
              />
              <TextField
                label="Title"
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
                label="Synopsis"
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
                label="Content"
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
                disabled={isLoding || isPending}
              >
                {isLoding ? "Uploading..." : isPending ? "Posting..." : "Post"}
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default HandleCreateBlogForm;
