import React from "react";
import {
  Box,
  List,
  ListItem,
  Divider,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchedProfile from "scenes/widgets/SearchedProfile";

export default function UserConnections({ followers, following }) {
  const isMobileScreen = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        width: "750px",
        height: "50vh",
        bgcolor: palette.background.default,
        border: `1px solid ${palette.neutral.border}`,
        overflow: "hidden",
        borderRadius: "6px",
      }}
    >
      <Grid container height="50vh">
        <Grid
          item
          xs={6}
          sx={{
            borderRight: `1px solid ${palette.neutral.border}`,
            height: "50vh",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ m: "10px" }}>
              Followers
            </Typography>
          </Box>
          <Divider />
          <List
            sx={{
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "8px",
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: palette.primary.main,
                borderRadius: "8px",
                border: "none",
                "&:hover": {
                  backgroundColor: palette.primary.dark,
                },
              }, // For Internet Explorer and Edge
            }}
          >
            {followers.map(({ $id, FollowerId, Name, ProfilePicture }) => (
                <SearchedProfile
                  key={FollowerId}
                  SearchedUserId={FollowerId}
                  Name={Name}
                  ProfilePicture={ProfilePicture}
                  Searched={true}
                />
            ))}
          </List>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ m: "10px" }}>
              Following
            </Typography>
          </Box>
          <Divider />
          <List
            sx={{
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "8px",
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: palette.primary.main,
                borderRadius: "8px",
                border: "none",
                "&:hover": {
                  backgroundColor: palette.primary.dark,
                },
              }, // For Internet Explorer and Edge
            }}
          >
            {following.map(({ $id, FollowedId, Name, ProfilePicture }) => (
              <SearchedProfile
                key={FollowedId}
                SearchedUserId={FollowedId}
                Name={Name}
                ProfilePicture={ProfilePicture}
                Searched={true}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
