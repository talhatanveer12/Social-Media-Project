import React from "react";
import classes from "./imageModal.module.css";

const ImageModal = ({ setShow, src, alt }) => {
  return (
    <div className={classes.modal}>
      <button
        onClick={() => {
          setShow(false);
        }}
      >
        <span className={classes.close}>&times;</span>
      </button>
      <img className={classes.modal_content} src={`http://localhost:4000/images/${src}`} alt={alt} />
    </div>
  );
};

export default ImageModal;