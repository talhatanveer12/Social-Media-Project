import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { MessageBox } from "react-chat-elements";
import { Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { Button } from "react-chat-elements";
import { ChatList } from "react-chat-elements";
import UserImage from "../../components/UI/UserImage";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetail } from "../../store/User/userAction";
import { useNavigate, useParams } from "react-router";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  //padding: theme.spacing(3),
  //textAlign: "center",
  fontWeight: "bold",
  color: theme.palette.text.secondary,
}));

const Message = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);

  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;

  useEffect(() => {
    dispatch(getAllUserDetail());
  }, [dispatch]);
  console.log(user);
  return (
    <Box
      width="100%"
      padding="5rem 6%"
      //display={isNonMobileScreens ? "flex" : "block"}
      maxHeight="540px"
      minHeight="540px"
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box border="1px solid white" maxHeight="640px" minHeight="640px">
        <Grid container>
          <Grid
            item
            xs={4}
            borderRight="1px solid white"
            maxHeight="640px"
            minHeight="640px"
            style={{ overflowY: "scroll" }}
          >
            <Item
              style={{
                textAlign: "center",
                padding: "24px",
                fontWeight: "500",
              }}
            >
              Talha Tanveer
            </Item>
            <hr />

            {user &&
              user.map((data) => {
                return (
                  <ChatList
                    onClick={() => {
                      navigate(`/Message/${data._id}`);
                    }}
                    key={data._id}
                    className="messageStyle"
                    dataSource={[
                      {
                        avatar: data.profilePic
                          ? `http://localhost:4000/images/${data.profilePic}`
                          : "../assets/user.png",
                        alt: "kursat_avatar",
                        title: data.name,
                        subtitle: "Hello",
                        date: new Date(),
                        unread: 1,
                      },
                    ]}
                  />
                );
              })}
          </Grid>
          {id ? (
            <Grid item xs={8} display="flex" flexDirection="column">
              <Item>
                <Box
                  gap="1rem"
                  flexDirection="row"
                  display="flex"
                  padding="8px"
                  alignItems="center"
                >
                  <UserImage size="50px" />
                  <Box>
                    <Typography variant="h4" color={main} fontWeight="500">
                      Anas Tanveer
                    </Typography>
                    <Typography color={medium}>Active</Typography>
                  </Box>
                </Box>
              </Item>
              <Grid  xs={12}>
                <MessageBox
                  position="left"
                  title="Talha"
                  type="text"
                  text="Hi there !"
                  titleColor={dark}
                  className="messageStyle"
                  status="read"
                  date={new Date()}
                />
                <MessageBox
                className="messageStyle"
                  position="right"
                  title="Anas"
                  type="text"
                  text="Click to join the meeting"
                  date={new Date()}
                />
              </Grid>
              <Input
                //className="SendMessage"
                placeholder="Type here..."
                multiline={false}
                rightButtons={
                  <Button
                    text={"Send"}
                    onClick={() => alert("Sending...")}
                    title="Send"
                  />
                }
              />
            </Grid>
          ) : (
            <Grid
              item
              xs={8}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              Send Message
            </Grid>
          )}
        </Grid>
      </Box>

      {/* <ChatList
        className="messageStyle"
        dataSource={[
          {
            avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
            alt: "kursat_avatar",
            title: "Kursat",
            subtitle: "Why don't we go to the No Way Home movie this weekend ?",
            date: new Date(),
            unread: 3,
          },
        ]}
      />
      <MessageBox
        position="left"
        title="Burhan"
        type="text"
        text="Hi there !"
        titleColor={dark}
        className="messageStyle"
        status="read"
        date={new Date()}
      />
      <MessageBox
        position="right"
        title="Emre"
        type="text"
        text="Click to join the meeting"
        date={new Date()}
      />
      <Input
        placeholder="Type here..."
        multiline={false}
        rightButtons={
          <Button
            text={"Send"}
            onClick={() => alert("Sending...")}
            title="Send"
          />
        }
      /> */}
    </Box>
  );
};

export default Message;
