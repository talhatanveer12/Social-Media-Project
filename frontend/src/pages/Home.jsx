import { Box, useMediaQuery } from "@mui/material";

// import MyPostWidget from "../components/Widget/MyPostWidget";
// import PostsWidget from "../components/Widget/PostsWidget";
// import AdvertWidget from "../components/Widget/AdvertWidget";
// import FriendListWidget from "../components/Widget/FriendListWidget";
// import UserWidget from "../components/Widget/UserWidget";
import Navbar from "../components/Navbar";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {/* <UserWidget userId={1} picturePath={"../../public/logo512.png"} /> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={"../../public/logo512.png"} /> */}
          {/* <PostsWidget userId={1} /> */}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            <Box m="2rem 0" />
            {/* <FriendListWidget userId={1} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
