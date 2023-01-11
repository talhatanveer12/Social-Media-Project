import { Button, ImageListItem } from "@mui/material";
import React, { useState } from "react";
import ImageModal from "../../UI/ImageModal/ImageModal";

const PostImage = ({ image, decs,id }) => {
  const [show, setShow] = useState(false);
  return (
    <>
    <Button
      onClick={() => {
        setShow(true);
      }}
    >
      <ImageListItem key={image}>
        <img
          src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${image}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${process.env.REACT_APP_IMAGE_BASE_URL}/${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={decs}
          cols={1}
          loading="lazy"
          variant="standard"
        />
      </ImageListItem>
    </Button>
    {show && <ImageModal key={id} src={image} alt={decs} setShow={setShow}></ImageModal>}
    </>
  );
};

export default PostImage;
