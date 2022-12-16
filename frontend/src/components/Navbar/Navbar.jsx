import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import "./navbar.css";
import Card from "../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../store/themeSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
//import Popover from "@mui/material/Popover";
//import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
//import { Popover } from "react-tiny-popover";
import UserImage from "../UI/UserImage";
import { searchedUserByName } from "../../store/User/userAction";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { detail, SearchedUser } = useSelector((state) => state.User);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  //const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const fullName = `${detail?.name}`;
  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
    dispatch(searchedUserByName(event.target.value));
  };

  useEffect(() => {
    if (search.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [search]);

  return (
    <Card padding="1rem 6%" backgroundColor={alt}>
      <Card gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          MERN Project
        </Typography>

        {isNonMobileScreens && (
          <>
            <Card flexDirection="column">
              <Card
                backgroundColor={neutralLight}
                borderRadius="9px"
                gap="3rem"
                padding="0.1rem 1.5rem"
              >
                <InputBase onChange={handleSearch} placeholder="Search..." />
                <IconButton>
                  <Search />
                </IconButton>
              </Card>
              {open && (
                <Card
                  className="three-dots-action"
                  backgroundColor={neutralLight}
                  flexDirection="column"
                >
                  {/* <Box
                    flexDirection="row"
                    gap="1rem"
                    alignItems="center"
                    display="flex"
                    padding="20px"
                  >
                    No Data Found..
                  </Box> */}
                  {SearchedUser?.length > 0 ?
                    SearchedUser.map((data) => {
                      return (
                        <Link to={`/Profile/${data._id}`}
                        key={data._id}
                        >
                          <Box
                            flexDirection="row"
                            gap="1rem"
                            alignItems="center"
                            display="flex"
                          >
                            <UserImage size="40px" image={data.profilePic} />
                            <Typography
                              variant="h5"
                              color={dark}
                              fontWeight="500"
                            >
                              {data.name}
                            </Typography>
                          </Box>
                        </Link>
                      );
                    }) : <Box
                    flexDirection="row"
                    gap="1rem"
                    alignItems="center"
                    display="flex"
                    padding="20px"
                  >
                    No Data Found..
                  </Box>}
                </Card>
              )}
            </Card>
          </>
        )}
        {/* <div className="search">
        
        </div> */}
      </Card>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <Card gap="2rem">
          <IconButton
            onClick={() => {
              dispatch(setTheme());
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Link to="/Message" className="linkStyle">
            <IconButton>
              <Message sx={{ fontSize: "25px" }} />
            </IconButton>
          </Link>
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem>Log Out</MenuItem>
            </Select>
          </FormControl>
        </Card>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <Card
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton sx={{ fontSize: "25px" }}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem>Log Out</MenuItem>
              </Select>
            </FormControl>
          </Card>
        </Box>
      )}
    </Card>
  );
};

export default Navbar;
