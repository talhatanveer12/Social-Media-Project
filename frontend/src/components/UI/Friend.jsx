import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, getAllUserDetail, unfollowUser } from "../../store/User/userAction";
import Card from "./Card";
import UserImage from "./UserImage";

const Friend = ({
  friendId,
  friend,
  name,
  email,
  subtitle,
  userPicturePath,
  follower = false,
}) => {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.User);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend =
    friend &&
    friend.find((data) => {
      return data.email === email?.toString();
    });

    const handleAddFriend = () => {
      const data = new FormData();
      data.append("id", friendId);
      dispatch(followUser(data));
      dispatch(getAllUserDetail());
      console.log("Add Friend");
    }
    const handleRemoveFriend = () => {
      const data = new FormData();
      data.append("id", friendId);
      dispatch(unfollowUser(data));
      dispatch(getAllUserDetail());
      console.log("Remove Friend");
    }

  return (
    <Card>
      <Card gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box>
          <Link to={`/Profile/${friendId}`} style={{ textDecoration: "none" }}>
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
          </Link>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </Card>
      {(!follower || !isFriend) && !(detail?._id === friendId) && (
        <>
          {isFriend ? (
            <IconButton onClick={handleRemoveFriend} sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            </IconButton>
          ) : (
            <IconButton onClick={handleAddFriend}  sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
              <PersonAddOutlined sx={{ color: primaryDark }} />
            </IconButton>
          )}
        </>
      )}
    </Card>
  );
};

export default Friend;
