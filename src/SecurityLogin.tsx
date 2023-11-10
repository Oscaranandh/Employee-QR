import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useFrappeAuth } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from "@mui/material/SnackbarContent";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";



export const SecurityLogin = () => {
  const { currentUser, login, logout } = useFrappeAuth();
//   const h2Styles = {
//     textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
//     marginTop: "10px",
    
//     // Other styles for h2
//   };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

     // Clear previous error messages and close snackbar
          setSnackbarMessage("");
          setSnackbarOpen(false);
    //Validate the form fields
    if(!username.trim()){
      setSnackbarMessage("please enter a username.");
      setSnackbarOpen(true);
      return;
    }

    if(!password.trim()){
      setSnackbarMessage("Please enter a password.");
      setSnackbarOpen(true);
      return;
    }
    // If form fields are valid, proceed with login attempt
    setLoading(true);
    try {
      await login(username, password);
      if (currentUser === "Administrator") {
        navigate("/WelcomePage");
      } else {
        setSnackbarMessage("Invalid credentials. Please try again.");
      setSnackbarOpen(true);
      }
    } catch (error :any) {
      //Handle specific error cases if needed
      if (error.response && error.response.data && error.response.data.message) {
        // Handle specific error message from API response
        setSnackbarMessage(error.response.data.message);
      } else if (error.message) {
        // Handle other error messages from the error object
        setSnackbarMessage(error.message);
      } else {
        // Fallback message for unknown errors
        setSnackbarMessage("An error occurred while logging in. Please try again later.");
      }
      setSnackbarOpen(true);
    } finally {
       // Hide loading indicator after login attempt

      setLoading(false);
    }
  };
  


  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogout = () => {
    logout();
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <div>
        <form
            className="label"
            style={{
              // backgroundColor: "white",
              backgroundImage:
              "url('./public/images/Frame 90.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize:"cover",
              // backgroundPositionY:"80px" ,
              width: "1110px",
              height: "800px",
              borderRadius: "10px",
              padding: "5px",
              boxShadow: "0 0 20px rgba(8, 7, 16, 0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}>
       
          <img
            // src="./public/images/agnikulLogo.png"
            // alt="Your Logo"
            // className="logo"
            style={{ width: "100px", marginBottom: "500px",marginRight:"1000px" }}
          />
      
       <div>
          <TextField
            label="Username"
            variant="outlined"
            style={{ width: "250px", marginTop: "-300px", }}
            
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <div>
          <TextField 
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            style={{ width: "250px", marginTop: "-250px", }} // Adjust the width as needed
            
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={()=>setShowPassword(!showPassword)}>
                  
                    {showPassword ? <VisibilityOff /> :<Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          </div>
          <div>
          <Button
            variant="contained"
            style={{ width: "100px",marginTop:"-350px" , padding:"8px 15px",backgroundColor: "#2D5831",borderRadius: "10px",}}
            onClick={handleLogin}
          >
            Log In
          </Button>
          </div>
       
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              {loading && <CircularProgress style={{marginTop:'20px'}} />}
                <Snackbar
                open={snackbarOpen}
                autoHideDuration={10000} // Snackbar will close automatically after 6 seconds
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <SnackbarContent
                  message={snackbarMessage}
                  style={{ backgroundColor: "blue", color: "white" }} // Set the text color to white
                  />
              </Snackbar>
          </div>
        </form>
    </div>
  );
};