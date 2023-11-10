import { useContext } from "react";
import { locateContext } from "./App";

export function ThankYouExit() {
  const { Employee_Name }: any = useContext(locateContext);
    return (
      <div>
      <div style={{
        display: "flex",
        justifyContent: "center",
      }}>
        <div style={{
              display:"flex",
              flexDirection:"column",
            }}>
                <div
                  style={{
                    color:"#2D5831",
                    fontFamily: 'Proxima Nova, sans-serif',
                    fontWeight: "bold",
                    fontSize: "40px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Thank You {Employee_Name}
                </div>
                <div
                  style={{
                    color:"#2D5831",
                    fontFamily: 'Proxima Nova, sans-serif',
                    fontWeight: "bold",
                    fontSize: "20px",
                    margin: "0 10px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  For Your Productive Hours
                </div>
        </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            width: "550px",
            height: "250px",
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "700",
            fontSize: "20px",
            flexDirection: "column",
            backgroundImage:
              "url('https://download-free-images.com/img/00003/thank-you-547794.gif')",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    );
  }