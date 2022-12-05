import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../UI/UserImage";
import WidgetWrapper from "../UI/WidgetWrapper";

import Card from "../UI/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserWidget = () => {
  const { detail, totalFollower, totalFollowing } = useSelector(
    (state) => state.User
  );
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <Card
        gap="0.5rem"
        pb="1.1rem"
        //onClick={() => navigate(`/profile/${userId}`)}
      >
        <Card gap="1rem">
          <UserImage image={detail?.profilePic} />
          <Box>
            <Link to={`/Profile/${detail?._id}`} style={{ textDecoration: "none" }}>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {detail?.name}
              </Typography>
            </Link>
            <Typography color={medium}>{totalFollowing} friends</Typography>
          </Box>
        </Card>
        <Link to="EditProfile">
          <Typography
            variant="h4"
            color={dark}
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            <ManageAccountsOutlined />
          </Typography>
        </Link>
      </Card>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{detail?.address}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <InfoOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{detail?.Bio}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <Card mb="0.5rem">
          <Typography color={medium}>No of Followers</Typography>
          <Typography color={main} fontWeight="500">
            {totalFollower}
          </Typography>
        </Card>
        <Card>
          <Typography color={medium}>No of Followings</Typography>
          <Typography color={main} fontWeight="500">
            {totalFollowing}
          </Typography>
        </Card>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <Card gap="1rem" mb="0.5rem">
          <Card gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </Card>
          <EditOutlined sx={{ color: main }} />
        </Card>

        <Card gap="1rem">
          <Card gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </Card>
          <EditOutlined sx={{ color: main }} />
        </Card>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
