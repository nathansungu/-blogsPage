import { Grid, Stack, Typography } from "@mui/material";

const HandleHeader = () => {
  return (
    <>
      <Grid
        container
        columns={12}
        sx={{ alignContent: "center", justifyContent: "center", mt: "2rem" }}
      >
        <Grid size={{ sm: 8, md: 6, xs: 10 }}>
          <Stack direction="row" alignItems="center">
              <Typography
                variant="h6"
                sx={{
                  pl: 4,
                  fontWeight: { md: 600, xs: 500 },
                  fontSize: { md: "1.5rem", sm: "1.3rem", xs: ".9rem" },
                  textTransform: "capitalize",
                }}
              >
                share your thoughts 
              </Typography>
           
            
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default HandleHeader;
