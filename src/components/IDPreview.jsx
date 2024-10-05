import React, { useState,useEffect } from 'react';
import { Box, Typography, Avatar, Divider, Button,IconButton,TextField } from '@mui/material';
import frameImage from "../assets/idframe.png"
import axios from "axios";
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};
const sendEmail=async (email,finalImage,setEmail)=>{
  try{
const reponse=await axios.post("http://localhost:5000/send-email", {
        to_email: email,
        image_data: finalImage,
      });
    }
    catch(err){
      console.log(err);
    }
    setEmail("");
}

const PreviewID=async(name,rollNo,regNo,Degree,Department,image,setFinalImage)=>{
  try {
    const [capturedImg, frameImg] = await Promise.all([
      loadImage(image),
      loadImage(frameImage),
    ]);
    const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = capturedImg.width;
      canvas.height = capturedImg.height;

      ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(capturedImg, 10, 130, canvas.width - 280, canvas.height-70);
      ctx.font = "20px sans serif";
      ctx.fillStyle = "blue";
      ctx.fillText(name,190,200);
      console.log(name);
      ctx.font = "20px Arial";
      ctx.fillStyle="red"
      ctx.fillText(rollNo+" / "+regNo,200,240);
      ctx.fillStyle="green"
      ctx.fillText(Degree+"/"+Department,200,280);
      
      
      

      const finalImage = canvas.toDataURL("image/png");

      setFinalImage(finalImage);
  }
  catch(err){
console.log("Operation Failed");
  }
}

const IDPreview = ({ data,img }) => {
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(()=>{
    PreviewID(name,rollNo,regNo,degree,department,image,setFinalImage);
  },[]);
  const [email,setEmail]=useState(null);
  const [capturedImage, setCapturedImage] = useState("");
const [finalImage, setFinalImage] = useState(null);
  const { regNo, name, degree, department, rollNo, validity} = data;
  
  const image=img;
 
  return (
    
    <>
     
     <Box>
 <TextField
            
            label="Enter your email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            sx={{ mb: 2 }}
          />
           <Button onClick={() =>{console.log("email",email);sendEmail(email,finalImage,setEmail)}} variant="outlined" color="success">
 Send Email
</Button> 
</Box>
 {finalImage&& <img src={finalImage}/>}

 </>

  );
};

export default IDPreview;
