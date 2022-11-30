import { Box, useMediaQuery } from "@mui/material";

import MyPostWidget from "../components/Widget/MyPostWidget";
import PostsWidget from "../components/Widget/PostsWidget";
// import AdvertWidget from "../components/Widget/AdvertWidget";
import FriendListWidget from "../components/Widget/FriendListWidget";
import UserWidget from "../components/Widget/UserWidget";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPost } from "../store/Post/postAction";

const Home = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.Post);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { followers, followings } = useSelector((state) => state.User);

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

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
          <UserWidget />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={"../../public/logo512.png"} />
          {post &&
            post.map((data) => {
              return (
                <PostsWidget
                key={data._id}
                  userId={data.userId}
                  description={data.decs}
                  picturePath={data.image}
                  likes={data.likes}
                  comments={data.comments}
                  postId={data._id}
                />
              );
            })}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <FriendListWidget
              title="Followers List"
              data={followers}
              friend={followings}
              follower={true}
            />
            <Box m="2rem 0" />
            <FriendListWidget
              title="Followings List"
              data={followings}
              friend={followers}
              follower={false}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
