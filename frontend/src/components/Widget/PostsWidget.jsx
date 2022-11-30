import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { getUserDetail } from "../../store/User/userAction";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId,postId,comments, description,picturePath,likes,isProfile = false }) => {
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    dispatch(getUserDetail(userId)).then((result) => {
      setUserDetail(result)
    }).catch((err) => {
      
    });
  },[dispatch,userId]);
  return (
    <>
      <PostWidget
        key={postId}
        postId={postId}
        postUserId={userId}
        name={userDetail?.name}
        description={description}
        location={"location"}
        picturePath={picturePath}
        userPicturePath={"../../../public/logo192.png"}
        likes={likes}
        comments={comments}
      />
    </>
  );
};

export default PostsWidget;
