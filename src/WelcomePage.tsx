
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { locateContext } from "./App";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./WelcomePage.css"


export function WelcomePage() {
  const {
    setShowLabel,
  }: any = useContext(locateContext);

  const navigate = useNavigate();

  const handleEntryClick = () => {
    setShowLabel(true);
    localStorage.setItem("isEntry", "true");
    navigate("/post");
  };

  const handleLogout = () => {
    localStorage.removeItem("isEntry"); // Remove the 'isEntry' flag to indicate logout
    navigate("/SecurityLogin"); // Navigate to the SecurityLogin page
  };

  const handleExitClick = () => {
    setShowLabel(false);
    localStorage.setItem("isEntry", "false");
    navigate("/post");
  };
 
  return (
    <div>
      <div  className="welcomehead"
        style={{
          backgroundImage:"welcome 1.png",
          width: "1110px",
          height: "800px",
          borderRadius: "10px",
          // padding: "5px",
          boxShadow: "0 0 20px rgba(8, 7, 16, 0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
          <div>
            {/* <img
              style={{
                width: "100px",
                height: "100px",
                marginTop: "10px",
                marginLeft: "0px",
              }}
              src=" https://agnikul.in/group-10.png"
            /> */}

                {/* <div>
                    <h2
                      style={{
                      color: "#1F272E",
                      marginLeft: "2px",
                      marginTop: "-10px",
                      }}>
                      Welcome to Agnikul
                    </h2>
                </div> */}
           </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
          <div
            className="entry"
            onClick={() => {
              handleEntryClick();
              navigate("/post");
              // window.location.reload();
            }}
            style={{
              backgroundColor: "white",
              boxShadow: "0 0 1px rgba(8, 7, 16, 0.1)",
              width: "400px",
              height: "300px",
              borderRadius: "10px",
              marginTop:"200px",
              // paddingTop: "0px",
              display: "flex",
              justifyContent: "up",
              alignItems: "center",
              fontWeight: "700",
              fontSize: "18px",
              cursor: "pointer",
              flexDirection: "column",
            }}
          >
            Entry
          </div>
          <div className="exit"
            onClick={() => {
              handleExitClick();
              navigate("/post");
            }}
            style={{
              backgroundColor: "white",
              width: "400px",
              height: "300px",
              borderRadius: "10px",
              marginTop:"200px",
              paddingTop: "0px",
              boxShadow: "0 0 1px rgba(8, 7, 16, 0.1)",
              display: "flex",
              justifyContent: "up",
              alignItems: "center",
              fontWeight: "700",
              fontSize: "18px",
              cursor: "pointer",
              flexDirection: "column",
            }}
          >
            Exit
          </div>
      </div>
            <div>

              <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "16px",padding:"8px 15px" ,backgroundColor: "#2D5831",borderRadius: "10px", }}
              onClick={handleLogout}
            >
              Security Logout
            </Button>
            </div>
        </div>
    </div>
  );
}