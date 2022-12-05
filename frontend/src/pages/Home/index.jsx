import { Box, useMediaQuery } from "@mui/material";

import MyPostWidget from "../../components/Widget/MyPostWidget";
import PostsWidget from "../../components/Widget/PostsWidget";
// import AdvertWidget from "../components/Widget/AdvertWidget";
import FriendListWidget from "../../components/Widget/FriendListWidget";
import UserWidget from "../../components/Widget/UserWidget";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPost } from "../../store/Post/postAction";
import socket from "../../Socket";
import { setPost, setPostLike } from "../../store/Post/postSlice";
import { getAllUserDetail } from "../../store/User/userAction";


const Home = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.Post);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { followers, followings } = useSelector((state) => state.User);

  // const sendMessage = () => {
  //   socket.emit("send_message", {message: "Hello"});
  // }

  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getAllUserDetail());
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(()=>{
   socket.on('receive_post',(data) => {
     dispatch(setPost(data.message))
   })
   socket.on('receive_like',(data) => {
    dispatch(setPostLike({post: data.message}))
  })
  socket.on('receive_comment',(data) => {
    dispatch(setPost(data.message))
  })
   // eslint-disable-next-line
  },[socket,dispatch])

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
          <MyPostWidget />
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
              friend={followings}
              follower={false}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
