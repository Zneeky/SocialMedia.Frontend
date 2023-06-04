import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  InputBase,
  List,
  ListItem,
  Slide,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Fade,
  Switch,
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
  BorderBottom,
  ClearOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import axios from "axios";
import SearchResultsList from "scenes/widgets/SearchResultsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import UserImage from "components/UserImage";
import BigSearch from "components/BigSearch";
import {
  MicrosoftEdgeOutline,
  MicrosoftEdgeOutlineWhite,
} from "icons/MicrosoftEdgeOutline";

const SideBar = ({ expandSize = 250 }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [jsonResult, setJsonResults] = useState([]);
  const slideRef = useRef(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  //Colors
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.Name}`;
  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchText("");
    setJsonResults([]);
  };

  const submitSearch = async () => {
    const response = await axios.get(
      `https://localhost:7172/api/users/results?name=${searchText}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.data;
    setJsonResults(data);
  };

  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
    setExpanded(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200 && checked === false) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };

    const handleClickOutside = (event) => {
      if (slideRef.current && !slideRef.current.contains(event.target)) {
        setChecked(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checked, slideRef]);

  return (
    <Box
      component="aside"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        width: expanded ? expandSize : 72,
        height: "100%",
        backgroundColor: background,
        padding: "8px 16px",
        transition: "width 0.2s ease",
      }}
    >
      {/*
        <Toolbar
        sx={{
          display: "flex",
          justifyContent: expanded ? "space-between" : "center",
          height: 60,
          opacity: expanded ? 1 : 1,
          transition: "opacity 0.2s ease",
        }}
      ></Toolbar>
        
        {!expanded && (
          <IconButton
            color="inherit"
            aria-label="Expand Menu"
            onClick={() => setExpanded(true)}
          >
            <MenuIcon />
          </IconButton>
        )}*/}

      <List sx={{ marginTop: 1 }}>
        <ListItem
          sx={{
            m: "2rem 0 4rem 0",
            display: "flex",
            justifyContent: "space-between",
            height: 60,
            width: expanded ? expandSize : 72,
            left: -26,
            padding: "8px 16px",
          }}
        >
          {expanded ? (
            <Box
              display="flex"
              width="100%"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color="primary"
                onClick={() => navigate("/home")}
                sx={{
                  ml:"10px",
                  "&:hover": {
                    color: primaryLight,
                    cursor: "pointer",
                  },
                }}
              >
                waVe
              </Typography>
            </Box>
          ) : (
            <Tooltip
              title="waVe"
              placement="right"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              arrow
            >
              <IconButton sx={{}}>
                {theme.palette.mode === "dark" ? (
                  <MicrosoftEdgeOutlineWhite />
                ) : (
                  <MicrosoftEdgeOutline />
                )}
              </IconButton>
            </Tooltip>
          )}
        </ListItem>
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 60,
            width: expanded ? expandSize : 72,
            left: -20,
            padding: "8px 16px",
          }}
        >
          {expanded ? (
            <Box
              display="flex"
              width="100%"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  borderRadius: "20px",
                  backgroundColor: theme.palette.background.alt,
                },
              }}
            >
              <IconButton
                sx={{ "&:hover": { backgroundColor: "transparent" } }}
              >
                <FontAwesomeIcon
                  icon={faHouse}
                  size="lg"
                  color={theme.palette.button.primary}
                />
              </IconButton>
              <Typography
                mt="0.6rem"
                ml="0.5rem"
                fontWeight={300}
                fontSize="17px"
                color={theme.palette.button.primary}
              >
                Home
              </Typography>
            </Box>
          ) : (
            <Tooltip
              title="Home"
              placement="right"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              arrow
            >
              <IconButton>
                <FontAwesomeIcon
                  icon={faHouse}
                  size="lg"
                  color={theme.palette.button.primary}
                />
              </IconButton>
            </Tooltip>
          )}
        </ListItem>

        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 60,
            width: expanded ? expandSize : 72,
            left: -19,
            padding: "8px 16px",
          }}
        >
          <Box onClick={handleChange} width="100%">
            {expanded ? (
              <Box
                display="flex"
                width="100%"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    borderRadius: "20px",
                    backgroundColor: theme.palette.background.alt,
                  },
                }}
              >
                <IconButton
                  sx={{ "&:hover": { backgroundColor: "transparent" } }}
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size="lg"
                    color={theme.palette.button.primary}
                  />
                </IconButton>
                <Typography
                  mt="0.6rem"
                  ml="0.5rem"
                  fontWeight={300}
                  fontSize="17px"
                  color={theme.palette.button.primary}
                >
                  Search
                </Typography>
              </Box>
            ) : (
              <Tooltip
                title="Search"
                placement="right"
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                arrow
              >
                <IconButton>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size="lg"
                    color={theme.palette.button.primary}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Slide
            direction="right"
            in={checked}
            mountOnEnter
            unmountOnExit
            ref={slideRef}
          >
            <Box
              height="100vh"
              display="block"
              textAlign="center"
              bgcolor={background}
              zIndex={3}
              position="fixed" // Add position: "fixed" to ensure the box remains visible
              top={0} // Adjust top, left, right, and bottom values as needed
              left={73}
              right={0}
              bottom={0}
              overflow="auto" // Add overflow: "auto" to enable scrolling within the box if needed
              width="397px"
              sx={{
                borderTopRightRadius: "16px",
                borderBottomRightRadius: "16px",
                borderRight: `1px solid ${theme.palette.neutral.light}`,
              }}
            >
              <BigSearch />
            </Box>
          </Slide>
        </ListItem>

        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 60,
            width: expanded ? expandSize : 72,
            left: -19,
            padding: "8px 16px",
          }}
        >
          {expanded ? (
            <Box
              display="flex"
              width="100%"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  borderRadius: "20px",
                  backgroundColor: theme.palette.background.alt,
                },
              }}
            >
              <IconButton
                sx={{ "&:hover": { backgroundColor: "transparent" } }}
              >
                <FontAwesomeIcon
                  icon={faCompass}
                  size="lg"
                  color={theme.palette.button.primary}
                />
              </IconButton>
              <Typography
                mt="0.6rem"
                ml="0.5rem"
                fontWeight={300}
                fontSize="17px"
                color={theme.palette.button.primary}
              >
                Explore
              </Typography>
            </Box>
          ) : (
            <Tooltip
              title="Explore"
              placement="right"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              arrow
            >
              <IconButton>
                <FontAwesomeIcon
                  icon={faCompass}
                  size="lg"
                  color={theme.palette.button.primary}
                />
              </IconButton>
            </Tooltip>
          )}
        </ListItem>

        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 60,
            width: expanded ? expandSize : 72,
            left: -19,
            padding: "8px 16px",
          }}
        >
          {expanded ? (
            <Box
              display="flex"
              width="100%"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  borderRadius: "20px",
                  backgroundColor: theme.palette.background.alt,
                },
              }}
            >
              <IconButton
                sx={{ "&:hover": { backgroundColor: "transparent" } }}
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  size="lg"
                  color={theme.palette.button.primary}
                />
              </IconButton>
              <Typography
                mt="0.6rem"
                ml="0.5rem"
                fontWeight={300}
                fontSize="17px"
                color={theme.palette.button.primary}
              >
                Messages
              </Typography>
            </Box>
          ) : (
            <Tooltip
              title="Messages"
              placement="right"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              arrow
            >
              <IconButton>
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  size="lg"
                  color={theme.palette.button.primary}
                />
              </IconButton>
            </Tooltip>
          )}
        </ListItem>

        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 60,
            width: expanded ? expandSize : 72,
            left: -19,
            padding: "8px 16px",
          }}
        >
          {expanded ? (
            <Box
              display="flex"
              width="100%"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  borderRadius: "20px",
                  backgroundColor: theme.palette.background.alt,
                },
              }}
            >
              <IconButton
                sx={{ "&:hover": { backgroundColor: "transparent" } }}
              >
                <UserImage image={user.ProfilePicture} size="30px" />
              </IconButton>
              <Typography
                mt="0.6rem"
                ml="0.5rem"
                fontWeight={300}
                fontSize="17px"
                color={theme.palette.button.primary}
              >
                Profile
              </Typography>
            </Box>
          ) : (
            <Tooltip
              title="Profile"
              placement="right"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              arrow
            >
              <IconButton>
                <UserImage image={user.ProfilePicture} size="30px" />
              </IconButton>
            </Tooltip>
          )}
        </ListItem>
      </List>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          display: "flex",
          justifyContent: "space-between",
          height: 60,
          width: expanded ? expandSize : 72,
          left: 0,
          padding: "8px 16px",
        }}
      >
        <IconButton
          onClick={() => dispatch(setMode())}
          sx={{ fontSize: "25px" }}
        >
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode sx={{ color: dark, fontSize: "25px" }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default SideBar;
