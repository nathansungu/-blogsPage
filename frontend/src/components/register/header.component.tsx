import { Grid, Stack, Typography } from "@mui/material";

const HandleHeader = () => {
  return (
    <>
      <Grid>
        <Stack
          sx={{
            direction: "column",
            textTransform: "capitalize",
            color: "primary.light",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            mt: 2,
          }}
        >
          <Typography sx={{ fontSize: "2rem", fontWeight: 600 }}>
            codey bloging site
          </Typography>
          <Typography
            sx={{ fontSize: { xm: "1rem", md: "1.rem" }, fontWeight: 500 }}
          >
            create account to see and post to see blogs
          </Typography>
        </Stack>
      </Grid>
    </>
  );
};

export default HandleHeader;
