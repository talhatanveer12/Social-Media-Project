import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  return (
    <>
      <PostWidget
        key={1}
        postId={1}
        postUserId={1}
        name={`Talha Tanveer`}
        description={"Hello World"}
        location={"location"}
        picturePath={"../../../public/logo192.png"}
        userPicturePath={"../../../public/logo192.png"}
        likes={2}
        comments={"comments"}
      />
    </>
  );
};

export default PostsWidget;
