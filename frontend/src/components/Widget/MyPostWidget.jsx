import {
  EditOutlined,
  DeleteOutlined,
  //AttachFileOutlined,
  //GifBoxOutlined,
  ImageOutlined,
  //MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import Dropzone from "react-dropzone";
import { useState } from "react";
import Card from "../UI/Card";
import WidgetWrapper from "../UI/WidgetWrapper";
import UserImage from "../UI/UserImage";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/Post/postAction";
import Swal from "sweetalert2";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.User);
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [currentPost, setPost] = useState("");
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = () => {
    const formData = new FormData();
    formData.append("userId", detail._id);
    formData.append("decs", currentPost);
    if (image) {
      formData.append("image", image);
      formData.append("picturePath", image.name);
    }

    dispatch(createPost(formData)).then((data) => {
      if (data.status === 200) {
        Swal.fire({
          text: "Post Create Successfully",
          icon: "success",
        });
      }
    });

    setImage(null);
    setPost("");
    setIsImage(false);
  };

  return (
    <WidgetWrapper>
      <Card gap="1.5rem">
        <UserImage image={detail?.profilePic} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={currentPost}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </Card>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <Card>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <Card>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </Card>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => {
                      setImage(null);
                    }}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </Card>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <Card>
        <Card
          gap="0.25rem"
          onClick={() => {
            setIsImage(!isImage);
          }}
        >
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </Card>

        {isNonMobileScreens ? (
          <>
            {/* <Card gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </Card>

            <Card gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </Card>

            <Card gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </Card> */}
          </>
        ) : (
          <Card gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </Card>
        )}

        <Button
          disabled={!currentPost}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </Card>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
