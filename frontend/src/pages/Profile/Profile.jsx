import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";
import UserImage from "../../components/UI/UserImage";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { detail, totalFollower, totalFollowing } = useSelector(
    (state) => state.User
  );
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 15%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "85%" : undefined}>
          <Box flexDirection="row" gap="4rem" display="flex">
            <UserImage size="130px" />
            <Box flexDirection="column" gap="1rem" display="flex">
            <Box flexDirection="row" gap="4rem" display="flex">
            <Grid container gap="2rem">
              <Typography variant="h3" color={dark} fontWeight="500">
                {detail?.name}
              </Typography>
              <Link to='/EditProfile' style={{textDecoration: "none"}}>
              <Button variant="outlined">Edit Profile</Button>
              </Link>
              </Grid>
              </Box>
              {isNonMobileScreens && (
                <Box flexDirection="row" gap="4rem" display="flex">
                  <Typography variant="h5" color={dark} fontWeight="500">
                    0 Posts
                  </Typography>
                  <Typography variant="h5" color={dark} fontWeight="500">
                    {totalFollower} Followers
                  </Typography>
                  <Typography variant="h5" color={dark} fontWeight="500">
                    {totalFollowing} Following
                  </Typography>
                </Box>
              )}

              <Typography variant="h5" color={dark} fontWeight="500">
                {detail?.bio}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ margin: "1rem" }} />
          <Box>
            <ImageList
              sx={{ overflow: "hidden" }}
              cols={4}
              gap={6}
              variant="root"

              //rowHeight={164}
            >
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    cols={1}
                    loading="lazy"
                    variant="standard"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

export default Profile;
