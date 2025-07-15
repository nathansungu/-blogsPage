import {
  Typography,
  Container,
  CircularProgress,
  CardMedia,
  Divider,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

interface Blog {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  user: {
    firstName: string;
    secondName: string;
  };
}

const BlogDetailsPage = () => {
  const theme = useTheme(); 
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/blogs/${id}`);
        setBlog(res.data.blog);
      } catch (err: any) {
        setError("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }

  if (error || !blog) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">{error || "Blog not found."}</Typography>
      </Container>
    );
  }

  return (
    <Container
      
      maxWidth="md"
      sx={{
        mt: 4,
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderRadius: 2,
        p: 3,
      }}
    >
      <CardMedia
        component="img"
        image={blog.imageUrl}
        alt={blog.title}
        sx={{ height: 400, borderRadius: 2, mb: 3 }}
      />

      <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
        {blog.title}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{ color: "text.secondary" }}
        gutterBottom
      >
        {blog.user?.firstName} 
        {/* {blog.user?.secondName} ·{" "} */}
        {new Date(blog.createdAt).toLocaleDateString()}
      </Typography>

      <Typography variant="h6" sx={{ color: "secondary.main", my: 2 }}>
        {blog.synopsis}
      </Typography>

      <Divider sx={{ my: 3, borderColor: "primary.main" }} />

      <Typography
        variant="body1"
        sx={{ whiteSpace: "pre-line", lineHeight: 1.8, color: "text.primary" }}
      >
        {blog.content}
      </Typography>
    </Container>
  );
};

export default BlogDetailsPage;
