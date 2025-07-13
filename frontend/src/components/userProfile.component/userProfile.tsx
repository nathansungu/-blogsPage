import { useState } from "react";
import useUserStore from "../../store/userStates";
import axiosInstance from "../../api/axios";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
type userDetails = {
  firstName: string;
  secondName: string;
  emailAddress: string;
  userName: string;
};
const HandleUserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [userName, setUserName] = useState("");

  const [error, setError] = useState({ message: "", status: false });
  const [sucess, setSucess] = useState({ message: "", status: false });
  const [response, setResponse] = useState({ message: "", status: false });

  const { user } = useUserStore();
  if (!user) {
    window.location.href = "/login";
    return;
  }
  setFirstName(user.firstName);
  setSecondName(user.secondName);
  setEmailAddress(user.emailAddress);
  setUserName(user.userName);

  const { isPending, mutate } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: async (userDetails: userDetails) => {
      const response = await axiosInstance.patch("/user", userDetails);
      const { message } = response.data;
      setResponse({ message: message, status: true });
      return response.data;
    },
    onSuccess: () => {
      setEditMode(false);
      setSucess({ message: response.message, status: true });
    },
    onError: () => {
      setError({ message: response.message, status: true });
    },
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const userDetails: userDetails = {
      firstName,
      secondName,
      emailAddress,
      userName,
    };

    mutate(userDetails);
  };

  const handelCancel = (e: React.FormEvent) => {
    e.preventDefault();

    setEditMode(false);
    return;
  };

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 600, margin: "2rem auto", padding: 4 }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 12, sm: 4 }} textAlign="center">
          <Avatar sx={{ width: 120, height: 120, margin: "0 auto" }}>
            {firstName.charAt(0)}
            {secondName.charAt(0)}
          </Avatar>
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <Typography variant="h5" gutterBottom>
            {editMode ? "Edit Profile" : "User Profile"}
          </Typography>

          <Box component="form">
            {error.status && (
              <Snackbar open 
              autoHideDuration={3000}
               message={error.message} 
               color="error"/>
            )}
            {sucess.status && (
              <Snackbar
                open
                autoHideDuration={3000}
                message={sucess.message}
                color="success"
              />
            )}

            <TextField
              margin="dense"
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              disabled={!editMode}
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Last Name"
              fullWidth
              value={secondName}
              onChange={(e) => {
                setSecondName(e.target.value);
              }}
              disabled={!editMode}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={emailAddress}
              onChange={(e) => {
                setEmailAddress(e.target.value);
              }}
              disabled={!editMode}
            />
            <TextField
              margin="dense"
              name="username"
              label="Username"
              fullWidth
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              disabled={!editMode}
            />
          </Box>

          <Box mt={2}>
            {editMode ? (
              <>
                <Button
                  loading={isPending}
                  onClick={handleUpdate}
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                >
                  Save
                </Button>
                <Button
                  onClick={handelCancel}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="outlined" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HandleUserProfile;
