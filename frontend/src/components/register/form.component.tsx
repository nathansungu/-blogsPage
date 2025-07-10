import { TextField, Button } from "@mui/material";

const HandleForm = () => {
  <>
    <TextField label="First Name" variant="outlined" fullWidth sx={{ mb: 2 }} />
    <Button variant="contained" fullWidth>
      Submit
    </Button>
  </>;
};
export default HandleForm;
