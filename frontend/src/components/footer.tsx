import { Box, Typography, Link, Container } from '@mui/material';

const HandleFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.light',
        color: 'white',
        py: 3,
        mt: 'auto',
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Codey Blogs. 
        </Typography>
        <Typography  align="center">
          Built By: {"  "}
          <Link href="https://www.linkedin.com/in/nathan-amudavi-b206602a6/" target="_blank" color="inherit" >
            Nathan Amudavi
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default HandleFooter;
