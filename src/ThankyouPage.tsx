import { useContext } from "react";
import { locateContext } from "./App";


export function ThankyouPage() {
  const { Employee_Name }: any = useContext(locateContext);
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{
              display:"flex",
              flexDirection:"column",
            }}>
          <div style={{
              fontFamily: 'Proxima Nova, sans-serif', 
              // fontStyle:"cursive",
              fontWeight: "bold",
              fontSize: "40px",
              color:"#2D5831",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              
            }}>
            Welcome {Employee_Name}
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
            Hope you have a wonderful time here
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
            alignItems: "flex-start",
            fontWeight: "700",
            fontSize: "20px",
            flexDirection: "column",
            backgroundImage:
              "url('http://img.freepik.com/vrije-vector/vlakke-handgetekende-mensen-die-een-doelverwezenlijking-vieren_23-2148843893.jpg?w=1380&t=st=1697191067~exp=1697191667~hmac=c442edec8c7f1720dae70008221dbf15e7b154d24855ca2d6582eb35384feacf')",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
      
    );
  }