import { Box, Divider, Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import SearchedProfile from "./SearchedProfile";

const SuggestionsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async () => {
    const response = await fetch(
      `https://localhost:7172/api/users/suggestions?userId=${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setSuggestions(data);
  };

  useEffect(() => {
    getSuggestions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "0.5rem" }}
      >
        Suggestions
      </Typography>
      <Box display="flex" flexDirection="column">
        {suggestions &&
        suggestions.$values &&
        suggestions.$values.length > 0 ? (
          suggestions.$values.map(({ $id, UserId, Name, ProfilePicture }) => (
            <Box
              key={$id}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  borderRadius: "20px",
                  backgroundColor: palette.background.alt,
                },
              }}
            >
              <SearchedProfile
                key={UserId}
                SearchedUserId={UserId}
                Name={Name}
                ProfilePicture={ProfilePicture}
                pTB="5px"
                pRL="0px"
              />
            </Box>
          ))
        ) : (
          <Typography>No suggestions available</Typography>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default SuggestionsWidget;
