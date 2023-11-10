import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { ImageList, ImageListItem } from "@mui/material";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { locateContext } from "./App";
import { useFrappeGetDocList } from "frappe-react-sdk";
import Container from "@mui/material/Container";
import { MyDocumentList } from "./Supportingfiles/Mydoclist";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Select, ToggleButton, ToggleButtonGroup } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "./DataFrom.css"

  const MyForm: React.FC = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const { formDataEmployee, setFormDataEmployee,Employee_Name,formDataLaptop,
    setFormDataLaptop,
    setEmployeeName}: any =
    useContext(locateContext);
  const showLabel = localStorage.getItem("isEntry") === "true";
  const [Employee_Id, setEmployeeId] = useState<string>("");
 
  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataEmployee({
      ...formDataEmployee,
      [name]: value,
    });
  };

  
  useEffect(() => {
    // Initialize the QR code scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 450,
          height: 450,
        },
        fps: 2,
      },
      true
    );

    // Define success and error handlers
    function success(result: string) {
      scanner.clear();
      setScanResult(result);
    }

    function error(err: any) {
      console.warn(err);
    }

    scanner.render(success, error);

    return () => {
      scanner.clear();
    };
  }, []);

  const { data }: any = useFrappeGetDocList("Employee", {
    fields: ["image","employeeid"],
    filters: [
      ["employee", "=", JSON.parse(localStorage.formdata)["id"]],
      //   // ["user_name", "=", JSON.parse(localStorage.formdata)["name"]],
    ],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });

  let photo = data?.[0]?.image;
  let empid = data?.[0]?.employeeid;
  console.log(photo);

  // Extract Employee ID and Name from the scan result
  const extractEmployeeInfo = (scanResult: string | null) => {
    if (!scanResult) return { id: "", name: "" };
    const parts = scanResult.split("/");
    const id = parts[1] || "";
    const name = parts[0] || "";
   
  
    //localstorage add pandrom
       localStorage.formdata = JSON.stringify({ name: name, id: id });
    
    return { id, name };
  };
  useEffect(() => {
    const { id: extractedId, name: extractedName } = extractEmployeeInfo(scanResult);
    setEmployeeId(extractedId);
    setEmployeeName(extractedName);
    
    setFormDataEmployee({ ...formDataEmployee, id: extractedId, name: extractedName });
}, [scanResult]);

    // location
    // const handleChange = (e: any) => {
    //   const { name, value } = e.target;
    //   setFormDataLaptop({
    //     ...formDataLaptop,
    //     [name]: value,
    //   });
    // };

    // useEffect(() => {
    //   setFormDataLaptop({
    //     laptopLocation: data?.[0]?.location || "",
    //     Employee_Id: formDataEmployee.id,
    //   });
    // }, [data]);
    // // location


    let datastatus: any =  MyDocumentList(localStorage,"NewDoctypefromOld");
    let employeestatus: any =  MyDocumentList(localStorage ,"Employee");
    // console.log("employeestatus", employeestatus);
    let statusData = datastatus?.[0]?.status;
    let employeeData = employeestatus?.[0]?.status;
    //  console.log("employeeData", employeeData);
    // console.log("statusData", statusData);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    const inTime = getCurrentTime();

    


    console.log("Form submitted with data:", formDataEmployee);

    if (showLabel) {
      if (employeeData === "Active") {
        if (statusData === "Online") {
          alert("You didnt Exit");
          navigate("/Welcomepage"); // Navigate to welcomepage
        } else {
        
          navigate("/LaptopVerification");
        }
      } else {
        alert("Employee is not active. Cannot proceed.");
        navigate("/welcomepage");
      }
    }
      if(!showLabel){
      if (employeeData === "Active") {
        if (statusData === "Offline") {
          alert("You didnt Entered");
          navigate("/welcomepage"); // Navigate to welcomepage
        } else {
          navigate("/LaptopVerification");
        }
      } else {
        alert("Employee is not active. Cannot proceed.");
        navigate("/welcomepage");
      }
    }
  };
  // console.log(datastatus);

  // Get the current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Get the current date
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;
    setCurrentDate(formattedDate);
  }, []);


  const [laptopSelected, setLaptopSelected] = useState<boolean | null>(null);

const handleLaptopSelected = () => {
  setLaptopSelected(true);
};

const handleNoLaptopSelected = () => {
  setLaptopSelected(false);
};

  
  return scanResult ? (
     <Container 
     style={{
      padding: "40px",
      // minWidth:"30vw",
      minHeight: "30vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      
    }}>
      
      <div>
      <label
          className="label"
          style={{
            margin: "20px 0", // Add margin to create a gap at the top
            padding: "20px",
            width:"470px",
            height: "80%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            borderRadius: "10px",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 0 40px rgba(8, 7, 16, 0.6)",
            display: "flex",
            flexDirection: "column",
            backgroundColor:"#ffffff",
            
          }}
        ></label>
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
    <ImageList
            sx={{
              backgroundColor: "white",
              marginTop: "30%",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
            cols={2}
            // rowHeight={160}
          >
            <ImageListItem
    sx={{
      width: "30%", // Set the width to 50% for 2 columns
      height: "50px",
    }}
  >
    <img
      style={{ borderRadius: "10px" }}
      src={photo}
      alt="Employee Photo"
    />
  </ImageListItem>
  <ImageListItem
    sx={{
      width: "30%", // Set the width to 50% for 2 columns
      height: "50px",
    }}
  >
    <img
      style={{ borderRadius: "10px" }}
      src={empid}
      alt="Employee Photo"
    />
  </ImageListItem>
          </ImageList>
      <Typography style={{ marginBottom: "1.5rem",fontSize:"1.2rem" }}>Employee Details</Typography>
      <div style={{ marginBottom: "10px" }}>
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={Employee_Name}
          onChange={handleInputChange}
          
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <TextField
          label="ID"
          variant="outlined"
          name="id"
          value={Employee_Id}
          onChange={handleInputChange}
         
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <TextField
          label={showLabel ? "In-Time" : "Out-Time"}
          variant="outlined"
          name={showLabel ? "inTime" : "outTime"}
          value={getCurrentTime()}
          onChange={handleInputChange}
          
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <TextField
          label="Date"
          variant="outlined"
          name="date"
          value={currentDate}
          onChange={handleInputChange}
        />
        
     
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "16px" }}
      >
        Next
      </Button>
    </form>
    </div>
    </Container>
  ) : (
    <div className="scanner-container" style={{border:"1px solid #ccc",borderRadius:"20px"}}>
      <div id="reader" className="custom-reader"></div>
    </div>
  );
};

export default MyForm;