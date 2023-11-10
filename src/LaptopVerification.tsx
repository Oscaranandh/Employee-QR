import { useNavigate } from "react-router-dom";
import { useContext,useState,useEffect } from "react";
import { locateContext } from "./App";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useFrappeDeleteDoc, useFrappeGetDocList } from "frappe-react-sdk";



export function LaptopVerification() {
  const showLabel = localStorage.getItem("isEntry") === "true";

  const {
    formDataEmployee,userFormImage, setUserFormImage,buttonClick, setButtonClick
  }: any = useContext(locateContext);

 const [isLocationSelected, setIsLocationSelected] = useState(false); // State variable to track location selection

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormDataLaptop({
      ...formDataLaptop,
      [name]: value,
    });
    setIsLocationSelected(!!value);
  };
  const navigate = useNavigate();
  const { formDataLaptop, setFormDataLaptop }: any = useContext(locateContext);


  const { data }: any = useFrappeGetDocList("LaptopVerify", {
    fields: ["image"],
    filters: [
      ["id", "=", JSON.parse(localStorage.formdata)["id"]],
      //   // ["user_name", "=", JSON.parse(localStorage.formdata)["name"]],
    ],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });
  console.log(data)

  const {deleteDoc} = useFrappeDeleteDoc();
  const handleDeleteDoc = async () => {
    try {
      await deleteDoc("LaptopVerify",formDataEmployee.id);
      console.log("Deleted Successfully laptop");

    } catch (error) {
      console.error("Error deleteing doc:", error);
    }

  }


  return (
    <div>
    <div
    className="welcomhead"
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
    <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
                        <div
                            onClick={() => {
                                if (showLabel && isLocationSelected) {
                                    if (data.length>0) {
                                        alert("Laptop already exists.");
                                      } else {
                                        setUserFormImage({ ...userFormImage, laptopstatus:"In" });
                                        setButtonClick({ ...buttonClick, button:"True" });
                                        navigate("/LaptopDetails");
                                      } // Navigate to welcomepage if both conditions are met
                                  }
                                  if (!showLabel) {
                                    if (data.length>0) {
                                      setUserFormImage({ ...userFormImage, laptopstatus:"Out" });
                                        navigate("/exitcheckbox"); 
                                        setButtonClick({ ...buttonClick, button:"True" });
                                      } else {
                                        alert("No Laptop Available");
                                      }
                                    // Navigate to welcomepage
                                  }
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
                            Laptop
                        </div>

                        <div
                            onClick={() => {
                            if (showLabel && isLocationSelected) {
                                navigate("/formwithcheckbox"); // Navigate to welcomepage
                            }
                            if (!showLabel) {
                                navigate("/exitcheckbox"); // Navigate to welcomepage
                            }
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
                            No Laptop
                        </div>
                </div>
                {showLabel && (
                        <div>
                        <FormControl variant="outlined" style={{ marginTop: "1rem"}}>
                            <InputLabel htmlFor="laptopLocation">Location</InputLabel>
                            <Select
                            label="Location"
                            name="laptopLocation"
                            value={formDataLaptop.laptopLocation}
                            onChange={handleChange}
                            required // Add the required attribute to the Select component
                            style={{ width: "400px", height: "50px" }}
                            >
                            <MenuItem value="">
                                <em>Select Location</em>
                            </MenuItem>
                            <MenuItem value={"Open Workspace - 1"}>Open Workspace - 1</MenuItem>
                            <MenuItem value={"Open Workspace - 2"}>Open Workspace - 2</MenuItem>
                            <MenuItem value={"Thaiyur"}>Thaiyur</MenuItem>
                            </Select>
                        </FormControl>
                        </div>
                )}
        </div>
    </div>
  );
}

