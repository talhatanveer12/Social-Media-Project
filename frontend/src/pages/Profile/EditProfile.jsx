import {
  Box,
  Button,
  TextField,
  //Typography,
  useMediaQuery,
  //useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { updateUserProfile } from "../../store/User/userAction";
import Swal from "sweetalert2";
// import ImagePicker from "../../components/UI/ImagePicker";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";

const EditProfile = () => {
  const { detail } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  //   const { palette } = useTheme();
  //   const dark = palette.neutral.dark;

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    data.append("image", image);

    dispatch(updateUserProfile(data)).then((data) => {
        if(data.status === 200) {
            Swal.fire({
                text: "Update Profile Successfully",
                icon: "success",
              });
        }
    }).catch((error) => {

    });
  };

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 15%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        flexDirection="column"
      >
        <Box
          width="100%"
          display={isNonMobileScreens ? "flex" : "block"}
          justifyContent="center"
          alignContent="center"
        >
          <Box
            height="160px"
            width="160px"
            sx={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              margin: "auto",
              color: "white",
              borderRadius: "50%",
              padding: "0.2rem 0.5rem",
            }}
          >
            <label htmlFor="profile" style={{ display: "inline" }}>
              <img
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                width="160px"
                height="160px"
                alt="user"
                src={
                  !image && detail?.profilePic
                    ? `http://localhost:4000/images/${detail?.profilePic}`
                    : image
                    ? URL.createObjectURL(image)
                    : "../assets/user.png"
                }
              />
            </label>
            <input
              type="file"
              id="profile"
              name="profile"
              style={{ display: "none", cursor: "pointer" }}
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </Box>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="center" mt="2rem">
            <TextField
              label="Name"
              name="name"
              defaultValue={detail?.name ? detail?.name : ""}
              sx={{ width: "24rem" }}
            />
          </Box>
          <Box display="flex" justifyContent="center" mt="2rem">
            <TextField
              label="Email"
              value={detail?.email ? detail?.email : " "}
              disabled
              sx={{ width: "24rem" }}
            />
          </Box>
          <Box display="flex" justifyContent="center" mt="2rem">
            <TextField
              label="Address"
              name="address"
              defaultValue={detail?.address ? detail?.address : ""}
              sx={{ width: "24rem" }}
            />
          </Box>
          <Box display="flex" justifyContent="center" mt="2rem">
            <TextField
              label="Bio"
              name="Bio"
              defaultValue={detail?.Bio ? detail?.Bio : ""}
              sx={{ width: "24rem" }}
            />
          </Box>
          <Box display="flex" justifyContent="center" mt="2rem">
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
