import { Box } from "@mui/material";
import React from "react";

const ImagePicker = ({src}) => {
  return (
    <Box
      height="140px"
      width="140px"
      sx={{
        backgroundColor: "red",
        borderRadius: "50%",
        "&:hover": {
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width="140px"
        height="140px"
        alt="user"
        src={src ? src : "../assets/user.png"}
      />
    </Box>
  );
};

export default ImagePicker;
