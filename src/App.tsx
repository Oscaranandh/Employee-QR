import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyForm from "./DataFrom";
import LaptopDetails from "./LaptopDetails";
import { WebcamCapture } from "./WebcamCapture.tsx";
import FormWithCheckbox from "./FormWithCheckbox";
import { ThankyouPage } from "./ThankyouPage";
import { WelcomePage } from "./WelcomePage";
import ExitCheckBox from "./ExitCheckBox";
import { ThankYouExit } from "./ThankYouExit.tsx";
import { SecurityLogin } from "./SecurityLogin.tsx";
import StandardListImage from "./StandardListImage";
import { MultipleImageCapture } from "./MultipleImageCapture";
import { createContext, useContext, useState } from "react";
import Notifiction from "./Notification.tsx"
import  EmployeeChart  from "./EmployeeChart.tsx";
import  EmployeeChartDays  from "./EmployeeChartDays.tsx";
import PieChart from "./PieChart.tsx"
import {LaptopVerification }from "./LaptopVerification.tsx"

// import { StandardListImageExit } from "./StandardListImageExit";

export const locateContext = createContext({});

function App() {
  localStorage.formdata;
  const [showLabel, setShowLabel] = useState(true);
  const [formDataLaptop, setFormDataLaptop] = useState({
    laptopBrand: "",
    laptopSerialNumber: "",
    laptopLocation: "",
    laptopImage: "",
  });

  const [userFormImage, setUserFormImage] = useState({
    image: null,
    laptopstatus: null,
  });

  const [buttonClick, setButtonClick] = useState({
    button: null,
  });
  
  const [imageCaptured, setImageCaptured] = useState(0);

  const [formDataEmployee, setFormDataEmployee] = useState({
    name: "",
    id: "",
    laptopSerialNumber: "",
    inTime: "",
    status:""
  });

  const [Employee_Name, setEmployeeName] = useState<string>("");

  
  const [formDataCheckBox, setFormDataCheckBox] = useState({
   laptop: false,
    pendrive: false,
    hardDisk: false,
    bluetooth: false,
    others: false,
    otherText: "",
  });
  interface CapturedImage {
    id: number;
    imageSrc?: string | null;
  }
  const [currentDate, setCurrentDate] = useState("");
  const [capturedImages, setCapturedImages] = useState<CapturedImage[]>([]);
  const [successCount, setSuccessCount] = useState<number>(0);
  

  return (
    <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
      <locateContext.Provider
        value={{
          Employee_Name: Employee_Name,
          setEmployeeName: setEmployeeName,
          formDataLaptop: formDataLaptop,
          setFormDataLaptop: setFormDataLaptop,
          imageCaptured:imageCaptured,
          setImageCaptured:setImageCaptured,
          userFormImage: userFormImage,
          setUserFormImage: setUserFormImage,
          formDataEmployee: formDataEmployee,
          setFormDataEmployee: setFormDataEmployee,
          formDataCheckBox: formDataCheckBox,
          setFormDataCheckBox: setFormDataCheckBox,
          currentDate: currentDate,
          setCurrentDate: setCurrentDate,
          showLabel: showLabel,
          setShowLabel: setShowLabel,
          capturedImages: capturedImages,
          setCapturedImages: setCapturedImages,
          successCount:successCount,
          setSuccessCount:setSuccessCount,
          buttonClick:buttonClick,
          setButtonClick:setButtonClick,
          //  extractEmployeeInfo :extractEmployeeInfo ,
        }}
      >
        <Routes>
          {/* <Route path="/get" element={<GetData />} /> */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/post" element={<MyForm />} />
          {/* <Route path="/QrReader" element={<Test />} /> */}
          <Route path="/LaptopDetails" element={<LaptopDetails />} />
          <Route path="/WebCamCapture" element={<WebcamCapture />} />
          <Route path="/FormWithCheckbox" element={<FormWithCheckbox />} />
          <Route path="/ThankyouPage" element={<ThankyouPage />} />
          <Route path="/WelcomePage" element={<WelcomePage />} />
          <Route path="/ExitCheckBox" element={<ExitCheckBox />} />
          <Route path="/ThankYouExit" element={<ThankYouExit />} />
          <Route path="/SecurityLogin" element={<SecurityLogin />} />
          <Route path="/StandardListImage" element={<StandardListImage />} />
          <Route path="/Notification" element={<Notifiction />} />
          <Route path="/EmployeeChart" element={<EmployeeChart />} />
          <Route path="/EmployeeChartDays" element={<EmployeeChartDays />} />
          <Route path="/LaptopVerification" element={<LaptopVerification />} />
        


          {/* <Route path="/StandardListImageExit" element={<StandardListImageExit />} /> */}
          <Route
            path="/MultipleImageCapture"
            element={<MultipleImageCapture />}
          />
        </Routes>
      </locateContext.Provider>
    </BrowserRouter>
  );
}
export default App;


