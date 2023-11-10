import TextField from "@mui/material/TextField";
import { useContext, useEffect } from "react";
import { locateContext } from "./App";
import { useFrappeCreateDoc, useFrappeGetDocList } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { WebcamCapture } from "./WebcamCapture.tsx";
import { Select, ToggleButton, ToggleButtonGroup } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import StandardListImage from "./StandardListImage";
import Laptop5thImage from "./Laptop5thImage";

const LaptopDetails = () => {
  const {
    formDataLaptop,
    setFormDataLaptop,
    formDataEmployee,
    imageCaptured,
  }: any = useContext(locateContext);

  const navigate = useNavigate();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormDataLaptop({
      ...formDataLaptop,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (imageCaptured === 1) {
      handleCreateDoc();
      // Navigate to the next page when an image is captured
      navigate("/FormWithCheckbox");
    }
  };


  const { createDoc } = useFrappeCreateDoc();
  const handleCreateDoc = async () => {
    interface CapturedImage {
      id: number;
      imageSrc: string;
    }

  const formSamplap = {
    id:formDataEmployee.id,
    image: imageCaptured.image,
  };
  console.log("phtoto",imageCaptured.image)

    try {
      await createDoc("LaptopVerify", formSamplap);
      console.log("Created Successfully");
    } catch (error) {
      console.error("Error creating doc......:", error);
    }  
}



  const { data } = useFrappeGetDocList("Employee", {
    fields: ["laptop_serial", "laptop_brand"],
    filters: [["id", "=", formDataEmployee.id]],
    orderBy: {
      field: "creation",
      order: "desc",
    },
  });

  useEffect(() => {
    setFormDataLaptop({
      laptopSerialNumber: data?.[0].laptop_serial || "",
      laptopBrand: data?.[0].laptop_brand || "",
      // laptopLocation: data?.[0].location || "",
      laptopImage: data?.[0].bio || "",
      Employee_Id: formDataEmployee.id,
    });
  }, [data]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  

  return (

    <div style={{height:"800px",width:"1250px", backgroundImage:
    "url('./public/images/Frame 70.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize:"contain",boxShadow: "0 0 20px rgba(8, 7, 16, 0.2)",backgroundPositionY:"-30px",borderRadius:"10px"}}>
    <form onSubmit={handleSubmit}>
      <div>
        <div style={{display:"flex",gap:"2px"}}>
        <Laptop5thImage/>
        <WebcamCapture />
        <StandardListImage />
        </div>
      <div style={{ marginTop: "30px", }}>
        <TextField
          label="Laptop Brand"
          variant="outlined"
          name="laptopBrand"
          value={formDataLaptop.laptopBrand}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: "20px", }}>
        <TextField
          label="Laptop Serial Number"
          variant="outlined"
          name="laptopSerialNumber"
          value={formDataLaptop.laptopSerialNumber}
          onChange={handleChange}
        />
      </div>
      <div style={{ marginTop: "1rem",}}>
        <Button
          type="submit"
          variant="contained"
          style={{marginTop:"5px",backgroundColor: imageCaptured === 1 ? "#2D5831" : "white",borderRadius: "5px",padding:"6px 15px",color:imageCaptured === 1 ? "white" : "#2D5831",borderColor: imageCaptured === 1 ? "white" : "#2D5831",borderStyle: "solid", // You can set the border style as needed (e.g., dashed, solid, etc.)
          borderWidth: "1px",}}
          disabled={imageCaptured !== 1}
        >
          Next
        </Button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default LaptopDetails;