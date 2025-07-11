import { Stack, Grid, Typography, Button } from "@mui/material";

const HandleHeader = () => {
  return (
    <>
      <Grid>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ p: 2, backgroundColor: "primary.light", color: "white" }}
        >
          <Stack width="60%" sx={{ pl: "10%" }}>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              Codey Blogs
            </Typography>
          </Stack>
          <Stack
            direction="row"
            width="40%"
            justifyContent="left"
            sx={{ gap: 2 }}
          >
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              <Button
                onClick={() => {
                  window.location.href = "/login";
                }}
                sx={{ color: "white", fontSize: "1.2rem" }}
              >
                login
              </Button>
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              <Button
                onClick={() => {
                  window.location.href = "/register";
                }}
                sx={{ color: "white", fontSize: "1.2rem" }}
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
