import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
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
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import axios from "axios";
import SearchResultsList from "scenes/widgets/SearchResultsList";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Phone as PhoneIcon,
  Bookmark as BookmarkIcon,
  AccountBalanceWallet as WalletIcon,
  Devices as DevicesIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faHouse,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import UserImage from "components/UserImage";

const SideBar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [jsonResult, setJsonResults] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
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
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      component="aside"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        width: expanded ? 250 : 72,
        height: "100%",
        backgroundColor: background,
        padding: "8px 16px",
        transition: "width 0.2s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: expanded ? "space-between" : "center",
          height: 60,
          opacity: expanded ? 1 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        <Typography
          variant="h6"
          component="p"
          sx={{
            color: theme.palette.primary.main,
            fontSize: 23,
            fontWeight: 600,
          }}
        >
          waVe
        </Typography>
        {/*{!expanded && (
          <IconButton
            color="inherit"
            aria-label="Expand Menu"
            onClick={() => setExpanded(true)}
          >
            <MenuIcon />
          </IconButton>
        )}*/}
      </Toolbar>

      <List sx={{ marginTop: 1 }}>
        {/* <ListItem
          sx={{
            display:"flex",
            justifyContent:"stretch",
            "&:hover": {
              backgroundColor: "green",
            },
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            sx={{
              color: expanded ? "#000" : "transparent",
              transition: "color 0.2s ease",
            }}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText
            primary="Calls"
            sx={{
              color: expanded ? "#000" : "transparent",
              transition: "color 0.2s ease",
            }}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <BookmarkIcon />
          </ListItemIcon>
          <ListItemText
            primary="Bookmarks"
            sx={{
              color: expanded ? "#000" : "transparent",
              transition: "color 0.2s ease",
            }}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <WalletIcon />
          </ListItemIcon>
          <ListItemText
            primary="Wallet"
            sx={{
              color: expanded ? "#000" : "transparent",
              transition: "color 0.2s ease",
            }}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <DevicesIcon />
          </ListItemIcon>
          <ListItemText
            primary="Devices"
            sx={{
              color: expanded ? "#000" : "transparent",
              transition: "color 0.2s ease",
            }}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            sx={{
              color: expanded ? "#000" : "transparent",
              transition: "color 0.2s ease",
            }}
          />
            <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              width: expanded ? "100%" : "0%",
              borderRadius: 12,
              background: "#e2e2e2",
            }}
          >
            <InputBase
              placeholder="search..."
              sx={{
                fontSize: 14,
                fontWeight: 400,
                color: "#000",
                width: "100%",
                padding: 1,
              }}
            />
          </Paper>
        </ListItem>*/}
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 60,
            width: expanded ? 250 : 72,
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
                  backgroundColor:theme.palette.background.alt,
                },
              }}
            >
              <IconButton sx={{"&:hover": { backgroundColor: "transparent" }}}>
                <FontAwesomeIcon
                  icon={faHouse}
                  size="lg"
                  color={theme.palette.button.primary}
                />
              </IconButton>
              <Typography
                mt="0.6rem"
                ml="0.5rem"
                fontWeight={400}
                fontSize="17px"
                color={theme.palette.button.primary}
              >
                Home
              </Typography>
            </Box>
          ) : (
            <IconButton>
              <FontAwesomeIcon
                icon={faHouse}
                size="lg"
                color={theme.palette.button.primary}
              />
            </IconButton>
          )}
        </ListItem>

        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 60,
            width: expanded ? 250 : 72,
            left: -19,
            padding: "8px 16px",
          }}
        >
          <IconButton>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="lg"
              color={theme.palette.button.primary}
            />
          </IconButton>
        </ListItem>

        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 60,
            width: expanded ? 250 : 72,
            left: -19,
            padding: "8px 16px",
          }}
        >
          <IconButton>
            <FontAwesomeIcon
              icon={faCompass}
              size="lg"
              color={theme.palette.button.primary}
            />
          </IconButton>
        </ListItem>

        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 60,
            width: expanded ? 250 : 72,
            left: -19,
            padding: "8px 16px",
          }}
        >
          <IconButton>
            <FontAwesomeIcon
              icon={faPaperPlane}
              size="lg"
              color={theme.palette.button.primary}
            />
          </IconButton>
        </ListItem>

        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: 60,
            width: expanded ? 250 : 72,
            left: -19,
            padding: "8px 16px",
          }}
        >
          <IconButton>
            <UserImage image={user.ProfilePicture} size="30px" />
          </IconButton>
        </ListItem>
      </List>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          display: "flex",
          justifyContent: "space-between",
          height: 60,
          width: expanded ? 250 : 72,
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
