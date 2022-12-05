import { useSelector } from "react-redux";
//import { getUserDetail } from "../../store/User/userAction";
import PostWidget from "./PostWidget";

const PostsWidget = ({
  userId,
  postId,
  comments,
  description,
  picturePath,
  likes,
  isProfile = false,
}) => {
  //const dispatch = useDispatch();

  const { user } = useSelector((state) => state.User);
  //const userDetail = user && user.filter((data) => data._id === userId);
  //console.log(userDetail);
  // user && setUserDetail(user.filter((data) => data._id === userId));
  // useEffect(() => {
  //   dispatch(getUserDetail(userId)).then((result) => {
  //     setUserDetail(result)
  //   }).catch((err) => {

  //   });
  // },[dispatch,userId]);
  return (
    <>
      <PostWidget
        key={postId}
        postId={postId}
        postUserId={userId}
        name={
          user &&
          user
            .filter((data) => data._id === userId)
            .map((test) => {
              return test.name;
            })
        }
        email={
          user &&
          user
            .filter((data) => data._id === userId)
            .map((test) => {
              return test.email;
            })
        }
        description={description}
        location={"location"}
        picturePath={picturePath}
        userPicturePath={
          user &&
          user
            .filter((data) => data._id === userId)
            .map((test) => {
              return test.profilePic;
            })
        }
        likes={likes}
        comments={comments}
      />
    </>
  );
};

export default PostsWidget;
