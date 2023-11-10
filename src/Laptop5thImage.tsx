import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useContext } from "react";
import { locateContext } from "./App";
import { Container } from "@mui/system";
export default function Laptop5thImage() {


    const { data }: any = useFrappeGetDocList("Employee", {
        fields: ["imagelist5"],
        filters: [
          ["employee", "=", JSON.parse(localStorage.formdata)["id"]],
          //   // ["user_name", "=", JSON.parse(localStorage.formdata)["name"]],
        ],
        orderBy: {
          field: "creation",
    
          order: "desc",
        },
      });
  console.log("lis", data);
  let image5 = data?.[0]?.imagelist5

  return (
    
    <ImageList sx={{ width:360 , height: 360 , backgroundColor: "white",marginTop:"130px",marginLeft:"60px"}}>
      <img
      style={{ borderRadius: "10px" }}
      src={image5}
      alt="Laptop Image 5"
    />
    </ImageList>
  );
}