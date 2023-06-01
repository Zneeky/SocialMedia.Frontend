import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import { setProfile } from "state";
import { useEffect } from "react";
import SideBar from "scenes/navbar/SideBar";
import { sizing } from "@mui/system";
import { Translate } from "@mui/icons-material";

const HomePage = () => {
  const dispatch = useDispatch();
  const isSM = useMediaQuery("(min-width:782px)");
  const isMD = useMediaQuery("(min-width:1000px)");
  const isL = useMediaQuery("(min-width:1200px)");
  const isXL = useMediaQuery("(min-width:1500px)");
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.user);
  const { palette } = useTheme();
  const userId = user?.UserId;
  const picturePath = user?.ProfilePicture;

  useEffect(() => {
    dispatch(
      setProfile({
        profile: profile,
      })
    );
  }, []);

  const profil = useSelector((state) => state.profile);
  console.log(profil);
  if (isXL) {
    return (
      <Box
        display="flex"
        backgroundColor={palette.background.alt}
        sx={{ zIndex: -5 }}
      >
        <SideBar expandSize={300} />
        <Box ml="300px" width="100%" display="flex" p="0">
          <Box margin="0 auto" display="flex" p="0">
            <Box padding="2rem 2rem 0rem 0rem" width="472px">
              <MyPostWidget userId={userId} picturePath={picturePath} />
              <PostsWidget userId={userId} />
            </Box>
            <Box padding="2rem 0rem 0rem 0rem" width="319px">
              <UserWidget userId={userId} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else if (isL) {
    return (
      <Box
        display="flex"
        backgroundColor={palette.background.alt}
        sx={{ zIndex: -5 }}
      >
        <SideBar />
        <Box ml="250px" width="100%" display="flex" p="0">
          <Box margin="0 auto" display="flex" p="0">
            <Box padding="2rem 2rem 0rem 0rem" width="472px">
              <MyPostWidget userId={userId} picturePath={picturePath} />
              <PostsWidget userId={userId} />
            </Box>
            <Box padding="2rem 0rem 0rem 0rem" width="319px">
              <UserWidget userId={userId} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else if (isMD) {
    return (
      <Box
        display="flex"
        backgroundColor={palette.background.alt}
        sx={{ zIndex: -5 }}
      >
        <SideBar />
        <Box ml="72px" width="100%" display="flex" p="0">
          <Box margin="0 auto" display="flex" p="0">
            <Box padding="2rem 2rem 0rem 0rem" width="472px">
              <MyPostWidget userId={userId} picturePath={picturePath} />
              <PostsWidget userId={userId} />
            </Box>
            <Box padding="2rem 0rem 0rem 0rem" width="319px">
              <UserWidget userId={userId} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else if (isSM) {
    return (
      <Box
        display="flex"
        backgroundColor={palette.background.alt}
        sx={{ zIndex: -5 }}
      >
        <SideBar />
        <Box ml="72px" width="100%" display="flex" p="0">
          <Box margin="0 auto" display="flex" p="0">
            <Box padding="2rem 2rem 0rem 0rem" width="472px">
              <MyPostWidget userId={userId} picturePath={picturePath} />
              <PostsWidget userId={userId} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <Navbar />
      <Box
        display="flex"
        backgroundColor={palette.background.alt}
        sx={{ zIndex: -5 }}
      >
        <Box  width="100%" display="flex" p="0">
          <Box margin="0 auto" display="flex" p="0">
            <Box padding="2rem 0rem 0rem 0rem" width="350px">
              <MyPostWidget userId={userId} picturePath={picturePath} />
              <PostsWidget userId={userId} />
            </Box>
          </Box>
        </Box>
      </Box>
      </Box>
    );
  }
};

export default HomePage;
