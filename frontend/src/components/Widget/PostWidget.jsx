import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";

import Friend from "../UI/Friend";
import WidgetWrapper from "../UI/WidgetWrapper";
import { useState } from "react";
import Card from "../UI/Card";
import UserImage from "../UI/UserImage";
import { useDispatch, useSelector } from "react-redux";
import { addPostComment, addPostLike } from "../../store/Post/postAction";

const PostWidget = ({
  postId,
  postUserId,
  name,
  email,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const { detail,followings } = useSelector((state) => state.User);
  const [isComments, setIsComments] = useState(false);
  const [addComment, setComment] = useState("");

  const isLiked = Boolean(likes[detail?._id]);
  const likeCount = Object.keys(likes).length;
  
  // const isLiked = 1 ? true : false;
  // const likeCount = 1;

  

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const handleLikes = () => {
    const formData = new FormData();
    formData.append("userId", detail._id);
    dispatch(addPostLike(formData,postId));
  }

  const handleComment = () => {
    const formData = new FormData();
    formData.append("userId", detail._id);
    formData.append('message',addComment);

    dispatch(addPostComment(formData,postId));

    setComment('');
  };


  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        friend={followings}
        name={name}
        email={email}
        subtitle={location}
        userPicturePath={userPicturePath?.toString()}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:4000/images/${picturePath}`}
        />
      )}
      <Card mt="0.25rem">
        <Card gap="1rem">
          <Card gap="0.3rem">
            <IconButton onClick={handleLikes}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </Card>

          <Card gap="0.3rem">
            <IconButton onClick={() => {setIsComments(!isComments)}}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </Card>
        </Card>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </Card>
      {isComments && (
        <>
          <Box mt="0.5rem" flexDirection="row" display="flex">
            <UserImage size="40px" />
            <InputBase
              placeholder="What's on your mind..."
              value={addComment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                margin: "0rem 1rem",
                width: "100%",
                backgroundColor: palette.neutral.light,
                borderRadius: "1.5rem",
                padding: "0.25rem 1.5rem",
              }}
            />
            <Button
              disabled={!addComment}
              onClick={handleComment}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              Send
            </Button>
          </Box>
          
          <Box mt="0.5rem">
          <Divider />
            {comments.map((comment, i) => (
              <Box key={`${'name'}-${i}`}>
                

                <Box mt="1rem" mb="1rem" flexDirection="row" display="flex">
                  <UserImage size="35px" />
                  <Box
                    sx={{
                      marginLeft: "1rem",
                      backgroundColor: palette.neutral.light,
                      width: "100%",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <Typography
                      sx={{
                        color: main,
                        m: "0.5rem 0",
                        pl: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      {comment.name}
                    </Typography>
                    <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                      {comment.message}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
            <Divider />
          </Box>
        </>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
