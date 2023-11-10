import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { locateContext } from "./App";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFrappeDeleteDoc, useFrappeGetDocList } from "frappe-react-sdk";
import { ImageList, ImageListItem } from "@mui/material";
import { useFrappeUpdateDoc } from "frappe-react-sdk";
import ArrowLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowCircleRight";

function parseTime(timeString: string): Date {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}

const ExitCheckBox = () => {
  const navigate = useNavigate();
  const {
    formDataCheckBox,
    setFormDataCheckBox,
    formDataLaptop,
    formDataEmployee,
    buttonClick,
    // currentDate,
    userFormImage,
    capturedImages,
  }: any = useContext(locateContext);

  const handleOtherTextChange = (e: any) => {
    const { value } = e.target;
    setFormDataCheckBox({
      ...formDataCheckBox,
      otherText: value,
    });
  };

  const {deleteDoc} = useFrappeDeleteDoc();
    const handleDeleteDoc = async () => {
      try {
        await deleteDoc("LaptopVerify",formDataEmployee.id);
        console.log("Deleted Successfully laptop");
  
      } catch (error) {
        console.error("Error deleteing doc:", error);
      }
  
    }


  const handleSubmit = (e: any) => {
    e.preventDefault(); // Handle form submission here (e.g., send data to the server)
    console.log("Form submitted with data:", formDataCheckBox);
    console.log("itemsarray", itemsArray?.[0] === "");
    // handleCreateDoc();//callpandrom crete agurathuku
    handleUpdateDoc();
    handleUpdateConficatedItems();
    if (buttonClick.button === "True"){
      handleDeleteDoc();
    }
    navigate("/ThankYouExit");
    setTimeout(() => {
      window.location.replace("/WelcomePage");
    }, 3000);
  };

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}`;
    setCurrentDate(formattedDate);
  }, []);

  //update attendance

  const { updateDoc } = useFrappeUpdateDoc();

  const handleUpdateDoc = async () => {
    const outTime = getCurrentTime(); // Get the current time here
    const workingHoursInMinutes = calculateWorkingHours(inTime, outTime);
    const Attendanceupdate = {
      out_time: outTime,
      working_hours: workingHoursInMinutes,
      out_time_date: currentDate,
    };
    try {
      await updateDoc(
        "Attendance",
        `${formDataEmployee.id}-${AttendanceDate}-${inTime}`,
        Attendanceupdate
      );
      console.log("Attendance Updated Successfully");
      console.log("Working Hours:", workingHoursInMinutes);
      console.log("inTime:", inTime);
      console.log("outTime:", outTime);
    } catch (error) {
      console.error("Error update doc......:", error);
    }
  };


  

  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function calculateWorkingHours(inTime: string, outTime: string): number {
    const inTimeDate = parseTime(inTime);
    const outTimeDate = parseTime(outTime);
    const timeDifferenceMs = outTimeDate.getTime() - inTimeDate.getTime();
    const timeDifferenceMinutes = timeDifferenceMs / (1000 * 60);
    if (timeDifferenceMinutes < 0) {
      // Adjust for working across midnight
      return (24 +((timeDifferenceMinutes) / 60));
    } else {
      return timeDifferenceMinutes / 60;
    }
  }

// nov 2



// nov 2
  const { data }: any = useFrappeGetDocList("NewDoctypefromOld", {
    fields: [
      "carry",
      "imagelist6",
      "date",
      "location",
      "time",
      "status",
    ],
    filters: [["id", "=", formDataEmployee.id]],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });

  console.log("ExitCheckBox", data);

  const { data:Laptop }: any = useFrappeGetDocList("LaptopVerify", {
    fields: [
        "image"
    ],
    filters: [["id", "=", formDataEmployee.id]],
    orderBy: {
      field: "creation",

      order: "desc",
    },
  });
  console.log("laptop status",Laptop?.[0] )

  

  // const itemsArray = data?.map((item) => item.carry.split(", ")).flat();
  const itemsArray = data?.[0].carry.split(",");
  const [uncheckedlist, setUncheckedlist] = useState<any>([]);
  const [checkedlist, setCheckedlist] = useState<any>([]);
  const itemsArrayImage = data?.[0].imagelist6.split("|lak|") || [];
  const Securitydate = data?.[0].date;

  useEffect(() => {
    if (data) {
      setUncheckedlist([...itemsArray]);
    }
  }, [data]);

  console.log(".........", itemsArray);
  // const Location = data?.[0].location;

  const handleUpdateConficatedItems = async () => {
    const checkedItems = Object.keys(formDataCheckBox).filter(
      (item) => formDataCheckBox[item]
    );

    const uncheckedItems = Object.keys(formDataCheckBox).filter(
      (item) => !formDataCheckBox[item]
    );

    const confiscatedupdate = {
      checked: checkedlist.join(","),
      unchecked: uncheckedlist.join(","),
      status: "Offline",
      laptop_status:userFormImage.laptopstatus,
    };
    console.log("checked", checkedItems, uncheckedItems);
    try {
      await updateDoc(
        "NewDoctypefromOld",
        `${formDataEmployee.id}-${Securitydate}-${inTime}`,
        confiscatedupdate
      );
      console.log("update Successfully Entry");
    } catch (error) {
      console.error("Error updating doc......:", error);
    }
  };

  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;
    if (!checked) {
      const index = uncheckedlist.indexOf(name);
      if (index !== -1) {
        const updatedUnchecked = [...uncheckedlist];
        const updatedChecked: any = [
          ...checkedlist,
          updatedUnchecked.splice(index, 1)[0],
        ];
        setUncheckedlist(updatedUnchecked);
        setCheckedlist(updatedChecked);
      }
    } else {
      const index = checkedlist.indexOf(name);
      if (index !== -1) {
        const updatedChecked: any = [...checkedlist];
        const updatedUnchecked = [
          ...uncheckedlist,
          updatedChecked.splice(index, 1)[0],
        ];
        setCheckedlist(updatedChecked);
        setUncheckedlist(updatedUnchecked);
      }
    }
  };

  console.log(".........", itemsArrayImage?.[0], itemsArrayImage);
  const Location = data?.[0].location;
  const inTime = data?.[0].time;
  const AttendanceDate = data?.[0].date;
  console.log(AttendanceDate);

  const Carousel = ({ itemsArrayImage }: { itemsArrayImage: string[] }) => {
    const [index, setIndex] = useState(0);
    const move = (direction: String) => {
      if (direction === "next") {
        setIndex((index + 1) % itemsArrayImage.length);
      } else {
        setIndex((index - 1 + itemsArrayImage.length) % itemsArrayImage.length);
      }
    };

    useEffect(() => {
      const interval = setInterval(() => {
        move("next");
      }, 3000);

      return () => clearInterval(interval);
    }, [index]);


//
    

    
//

    return (
      <div
        className="container"
        style={{
          width:"420px",
          height:"300px",
          display: "flex",
          marginLeft: "-350px",
          borderRadius: "5px",
        }}
      >
        <Button onClick={() => move("previous")} className="overlay left">
        <ArrowLeftIcon></ArrowLeftIcon>
        </Button>
        <img
          style={{ height: "280px", width: "300px",marginTop:"10px"}}
          src={itemsArrayImage[index]}
          alt={`item-${index}`}
          loading="lazy"
        />
        <div className="overlay indicator">
          {itemsArrayImage.map((item, i) => (
            <div key={i}></div>
          ))}
        </div>
        <Button onClick={() => move("next")} className="overlay right">
        <ArrowRightIcon></ArrowRightIcon>
        </Button>
      </div>
    );
  };

  return (
      <Container
        style={{ display:"flex",textAlign: "center",width:"1110px",height:"800px",boxShadow: "0 0 20px rgba(8, 7, 16, 0.6)",backgroundImage:
        "url('./public/images/Frame 70.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize:"cover",
        borderRadius: "5px",}}
      >
        <div style={{ marginTop: "450px",marginLeft:"160px" }}>
        {Laptop && Laptop?.[0]?.image ? (
            <img
              src={Laptop?.[0]?.image}
              alt="laptop image"
              width="280px"
              height="250px"
            />
          ) : (
            <img
              src="./public/images/nolap.jpg"  // Replace with the actual path to your "No Laptop image"
              alt="No Laptop image"
              width="280px"
              height="250px"
            />
          )}
    </div>
        <div style={{marginTop:"60px"}}>
        {itemsArray?.length === 1 && itemsArray?.[0] === "" ? (
          <></>
        ) : (
          <Carousel itemsArrayImage={itemsArrayImage} />
        )}
        </div>
        <form onSubmit={handleSubmit} style={{marginLeft:"200px",marginTop:"50px"}}>
        <h2>Confiscated Items:</h2>
          <div>
          <FormGroup style={{marginTop:"10px",marginLeft:"30px"}}>
            {itemsArray?.length === 1 && itemsArray?.[0] === "" ? (
              <></>
            ) : (
              itemsArray?.map((item: any, index: any) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={formDataCheckBox[item]}
                      onChange={() =>
                        handleCheckboxChange({
                          target: {
                            name: item,
                            // checked: !formDataCheckBox[item],
                            checked: checkedlist.includes(item),
                          },
                        })
                      }
                      name={item}
                    />
                  }
                  label={item}
                />
              ))
            )}
          {formDataCheckBox.others && (
            <TextField
              label="Other Items"
              variant="outlined"
              name="otherText"
              value={formDataCheckBox.otherText}
              onChange={handleOtherTextChange}
              style={{ marginTop: "16px" }}
            />
          )}
          </FormGroup>
          </div>

          <div style={{ marginTop: "350px",marginLeft:"10px" }}>
            <TextField
              label="Location"
              variant="outlined"
              name="name"
              value={Location}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            // color="primary"
            style={{ marginTop: "10px",padding:"8px 15px",backgroundColor: "#2D5831",borderRadius: "10px", }}
          >
            Return
          </Button>
        </form>
      </Container>
  );
};

export default ExitCheckBox;
