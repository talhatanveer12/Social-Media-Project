import { Box, Typography, useTheme } from "@mui/material";
//import Friend from "components/Friend";
//import WidgetWrapper from "components/WidgetWrapper";
import Friend from "../UI/Friend";
import WidgetWrapper from "../UI/WidgetWrapper";

const FriendListWidget = () => {

  const { palette } = useTheme();

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">

          <Friend
            key={1}
            friendId={1}
            name={`Talha Tanver`}
            subtitle={'qwewq'}
            userPicturePath={'../../../public/logo192.png'}
          />
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;