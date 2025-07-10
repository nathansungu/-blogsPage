import { TextField, Button, Grid, Stack, Alert, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type UserData = {
  firstName: string;
  secondName: string;
  useName: string;
  Password: string;
  email: string;
};

const sendData = async (UserData: UserData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/register",
    UserData
  );
  return response.data;
};

const HandleForm = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [useName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // muatation hook
  const [mutate, { isLoading, isError, error }] = useMutation(sendData);

  const UserData = {
    firstName,
    secondName,
    useName,
    Password,
    email,
  };

  const handleSubmit = () => {
    
    mutate(UserData);

    return;
  };
  return (
    <>
      <Grid sx={{ mt: 1 }}>
        <Stack sx={{ alignItems: "center" }}>
          <form>
            {isError && <Typography></Typography>}


          <Stack sx={{ gap: 2, width: { xs: "90%", sm: "70%", md: "50%" } }}>
            
            <TextField
              label="First Name"
              variant="outlined"
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                let nameError = e.target.validity.valid;
                if (!nameError) {
                  setError(true);
                  setErrorMessage("Please enter a valid first name.");
                } else {
                  setError(false);
                  setErrorMessage("");
                }
              }}
              error={inputError}
              helperText={inputError && errorMessage}
            />
            <TextField
              label="second Name"
              variant="outlined"
              required
              value={secondName}
              onChange={(e) => {
                setSecondName(e.target.value);
                let secondNameError = e.target.validity.valid;
                if (!secondNameError) {
                  setError(true);
                  setErrorMessage("Please enter a valid second name.");
                } else {
                  setError(false);
                  setErrorMessage("");
                }
              }}
              error={inputError}
              helperText={inputError && errorMessage}
            />
            <TextField
              label="User Name"
              variant="outlined"
              required
              value={useName}
              onChange={(e) => {
                setUserName(e.target.value);
                let nameError = e.target.validity.valid;
                if (!nameError) {
                  setError(true);
                  setErrorMessage("Please enter a valid user name.");
                } else {
                  setError(false);
                  setErrorMessage("");
                }
              }}
              error={inputError}
              helperText={inputError && errorMessage}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                let emailError = e.target.validity.valid;
                if (!emailError) {
                  setError(true);
                  setErrorMessage("Please enter a valid email address.");
                } else {
                  setError(false);
                  setErrorMessage("");
                }
              }}
              error={inputError}
              helperText={inputError && errorMessage}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              required
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
                let passwordError = e.target.validity.valid;
                if (!passwordError) {
                  setError(true);
                  setErrorMessage("Please enter a valid password.");
                } else {
                  setError(false);
                  setErrorMessage("");
                }
              }}
              error={inputError}
              helperText={inputError && errorMessage}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              error={Password !== confirmPassword}
              helperText={
                Password !== confirmPassword ? "Passwords do not match." : ""
              }
            />
          </Stack>
          <Stack sx={{ mt: 2 }}>
            <Button
              disabled={isLoading}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
          </form>
        </Stack>
      </Grid>
    </>
  );
};
export default HandleForm;
