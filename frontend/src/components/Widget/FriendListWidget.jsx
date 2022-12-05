import { Box, Typography, useTheme } from "@mui/material";
//import Friend from "components/Friend";
//import WidgetWrapper from "components/WidgetWrapper";
import Friend from "../UI/Friend";
import WidgetWrapper from "../UI/WidgetWrapper";

const FriendListWidget = ({title,data,friend,follower}) => {

  const { palette } = useTheme();

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {title}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
      {data.length !== 0 ? data.map((data) => { return <Friend
            key={data?._id}
            friendId={data?._id}
            name={data?.name}
            subtitle={data?.bio}
            email={data?.email}
            friend={friend}
            follower={follower}
            userPicturePath={data?.profilePic}
          />}) : <Typography variant="h4" align="center">No Friends Found</Typography> }
          
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;