import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import UserImage from "../../components/UI/UserImage";
import ImageList from "@mui/material/ImageList";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PostImage from "../../components/Widget/PostImage";
import { getUserAllPost } from "../../store/Post/postAction";
import { followUser, unfollowUser } from "../../store/User/userAction";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userPost } = useSelector((state) => state.Post);
  const { detail, otherUserDetail, followings } = useSelector(
    (state) => state.User
  );
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  const isFriend =
    followings &&
    followings.find((data) => {
      return data.email === otherUserDetail?.email;
    });
  
  const handleAddFriend = () => {
    const data = new FormData();
    data.append("id", otherUserDetail?._id);
    dispatch(followUser(data));
    console.log("Add Friend");
  }
  const handleRemoveFriend = () => {
    const data = new FormData();
    data.append("id", otherUserDetail?._id);
    dispatch(unfollowUser(data));
    console.log("Remove Friend");
  }

  useEffect(() => {
    dispatch(getUserAllPost(id));
    // eslint-disable-next-line
  }, [dispatch]);
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
            <UserImage image={otherUserDetail?.profilePic} size="130px" />
            <Box flexDirection="column" gap="1rem" display="flex">
              <Box flexDirection="row" gap="4rem" display="flex">
                <Grid container gap="2rem">
                  <Typography variant="h3" color={dark} fontWeight="500">
                    {otherUserDetail?.name}
                  </Typography>

                  {detail?._id === otherUserDetail?._id ? (
                    <Link to="/EditProfile" style={{ textDecoration: "none" }}>
                      <Button variant="outlined">Edit Profile</Button>
                    </Link>
                  ) : !isFriend ? (
                      <Button variant="outlined" onClick={handleAddFriend}>Add Friend</Button>
                  ) : (
                      <Button variant="outlined" onClick={handleRemoveFriend}>Remove Friend</Button>
                  )}
                </Grid>
              </Box>
              {isNonMobileScreens && (
                <Box flexDirection="row" gap="4rem" display="flex">
                  <Typography variant="h5" color={dark} fontWeight="500">
                    {userPost.length} Posts
                  </Typography>
                  <Typography variant="h5" color={dark} fontWeight="500">
                    {otherUserDetail?.followers?.length} Followers
                  </Typography>
                  <Typography variant="h5" color={dark} fontWeight="500">
                    {otherUserDetail?.followings?.length} Following
                  </Typography>
                </Box>
              )}

              <Typography variant="h5" color={dark} fontWeight="500">
                {otherUserDetail?.bio}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ margin: "1rem" }} />
          <Box>
            <ImageList
              sx={{ overflow: "hidden" }}
              cols={3}
              gap={6}
              variant="root"
              //rowHeight={164}
            >
              {userPost.map((item) => (
                <PostImage
                  key={item._id}
                  image={item.image}
                  decs={item.decs}
                  id={item._id}
                />
              ))}
            </ImageList>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
