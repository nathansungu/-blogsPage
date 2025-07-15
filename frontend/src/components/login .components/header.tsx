import { Stack, Grid, Typography, Button, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
const HandleHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid>
        <Stack
          direction="row"
          sx={{
            p: 1,
            backgroundColor: "primary.light",
            color: "white",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Stack direction="row" width="40%" gap={1}>
            <CardMedia
              component="img"
              image="/logo2.png"
              sx={{
                borderRadius: "50%",
                objectFit: "cover",
                height: "2.5rem",
                width: "2.5rem",
              }}
            />
            <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "1.2rem",
                    md: "1.8rem",
                    textAlign: "center",
                    fontWeight: "bold",
                  },
                  fontWeight: "bold",
                }}
              >
                Codey Blogs
              </Typography>
            </Stack>
          </Stack>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { xs: ".8rem", sm: "1rem", md: "1.5rem" },
              }}
            >
              Blogs
            </Typography>
          </Button>

          <Stack direction="row" justifyContent="left" sx={{ gap: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                sx={{
                  color: "white",
                  fontSize: { xs: ".8rem", sm: "1rem", md: "1.5rem" },
                }}
              >
                login
              </Button>
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
                sx={{
                  color: "white",
                  fontSize: { xs: ".8rem", sm: "1rem", md: "1.5rem" },
                }}
              >
                register
              </Button>
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};

export default HandleHeader;
