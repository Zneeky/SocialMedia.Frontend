import { Box, Typography, useTheme, Divider } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfile } from "state";

const SearchedProfile = ({ SearchedUserId, ProfilePicture, Name }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const userId = user.UserId;
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const main = palette.neutral.main;

  const getProfile = async () => {
    if (SearchedUserId === userId) {
      dispatch(
        setProfile({
          profile: user,
        })
      );
    } else {
      const response = await fetch(
        `https://localhost:7172/api/users/${SearchedUserId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      dispatch(
        setProfile(
          {
            profile: data,
          },
          []
        )
      );
    }
  };

  useEffect(() => {
    console.log(SearchedUserId, ProfilePicture, Name);
  });

  return (
    <Box
      onClick={() => {
        getProfile();
        navigate(`/profile/${SearchedUserId}`);
        navigate(0);
      }}
      sx={{
        p: "8px 24px",
        overflowY: "visible",
        background: "transparent",
        flexDirection: "column",
        boxSizing: "border-box",
        display: "flex",
        position: "static",
        alignItems: "stretch",
        overflowX: "visible",
        justifyContent: "flex-start",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          justifyContent: "center",
          minWidth: "0px",
          flexDirection: "column",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "stretch",
          position: "relative",
          zIndex: 0,
          flexGrow: 1,
          cursor: "pointer",
          listStyle: "none",
        }}
      >
        <Box
          sx={{
            flexWrap: "nowrap",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            flexShrink: "0",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              flexDirection: "column",
              alignSelf: "center",
              boxSizing: "border-box",
              display: "flex",
              position: "relative",
              zIndex: 0,
              userSelect: "none",
            }}
          >
            <Box
              sx={{
                overflowY: "visible",
                mr: "12px",
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                position: "static",
                alignItems: "stretch",
                alignSelf: "auto",
                justifyContent: "flex-start",
                overflowX: "visible",
                flexGrow: "0",
              }}
            >
              <UserImage image={ProfilePicture} size="44px" />
            </Box>
          </Box>
          <Box
            sx={{
              flexShrink: 1,
              minWidth: 0,
              flexBasis: "auto",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
              flexDirection: "column",
              position: "relative",
              flexGrow: 1,
              zIndex: 0,
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                borderBottomRightRadius: "0",
                minHeight: "0",
                position: "static",
                alignSelf: "auto",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexGrow: "1",
              }}
            >
              <Typography sx={{ fontWeight: "bold", position:"relative", whiteSpace:"pre-line" }}>
                {Name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchedProfile;
