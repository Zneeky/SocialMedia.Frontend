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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserImage from "components/UserImage";
import SearchResultsList from "scenes/widgets/SearchResultsList";

const BigSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [jsonResult, setJsonResults] = useState(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.token);

  //Colors
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  //API calls
  const submitSearch = async () => {
    console.log("submitSearch called");
    try {
      const response = await axios.get(
        `https://localhost:7172/api/users/results?name=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      console.log("Data received: ", data);
      setJsonResults(data);
    } catch (error) {
      console.error("Error in API call: ", error);
    }
  };

  //useEffect
  useEffect(() => {
    console.log("searchText changed: ", searchText);
    if (searchText.length > 2) {
      submitSearch();
    }
  }, [searchText]);

  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
      }}
    >
      <Box
        sx={{
          p: "12px 14px 36px 24px",
          m: "10px 0px",
        }}
      >
        <Typography
          sx={{
            textAlign: "left",
            m: "0!important",
            wordWrap: "break-word",
            position: "relative",
            fontWeight: 500,
            fontSize: "25px",
          }}
        >
          Search
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignSelf: "auto",
          flexGrow: "1",
          overflowY: "visible",
        }}
      >
        <Box
          sx={{
            m: "0 16px",
            flexDirection: "column",
            display: "flex",
            flex: "0 1 auto",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            flexGrow: "0",
            mb: "24px",
          }}
        >
          <InputBase
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            inputProps={{ maxLength: 40 }}
            sx={{
              borderRadius: "8px",
              width: "100%",
              height: "40px",
              zIndex: 1,
              background: theme.palette.background.alt,
              boxSizing: "border-box",
              padding: "3px 16px",
              textAlign: "left",
              outline: "none",
            }}
          />
          <IconButton
            onClick={() => setSearchText("")}
            size="small"
            sx={{
              zIndex: 2,
              position: "absolute",
              top: "8px",
              left: "330px",
            }}
          >
            <ClearOutlined fontSize="inherit" />
          </IconButton>
        </Box>
        <Box
          sx={{
            zIndex: 2,
            width: "100%",
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            height: "100%",
            position: "relative",
            borderTop: `1px solid ${theme.palette.background.alt}`,
          }}
        >
          <Box
            sx={{
              p: "12px 0px 0px 0px",
              width: "100%",
              flexDirection: "column",
              boxSizing: "border-box",
              display: "flex",
              overflowX: "hidden",
              height: "100%",
            }}
          >
            {jsonResult!==null && <SearchResultsList profileValues={jsonResult} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BigSearch;
