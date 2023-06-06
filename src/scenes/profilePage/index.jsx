import {
  Box,
  useMediaQuery,
  CircularProgress,
  useTheme,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import SideBar from "scenes/navbar/SideBar";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const isSM = useMediaQuery("(min-width:782px)");
  const isMD = useMediaQuery("(min-width:1000px)");
  const isL = useMediaQuery("(min-width:1200px)");
  const isXL = useMediaQuery("(min-width:1500px)");
  const isNonMobileScreens = useMediaQuery("(min-width:782px)");

  const getUser = async () => {
    const response = await fetch(`https://localhost:7172/api/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    console.log(data);
    setUser(data);
  };

  useEffect(() => {
    getUser();

    const delay = 1000; // 1 second

    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  if (isXL) {
    return !isLoading ? (
      <Box display="flex" backgroundColor={palette.background.alt}>
        <SideBar expandSize={300} />
        <Box
          width="100%"
          ml="300px"
          padding="2rem 6%"
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="100%">
            <UserWidget userId={userId} isNotProfile={false} />
          </Box>
          {/*<Divider sx={{borderColor: palette.neutral.borderColor, mt:"2rem", width:"100%"}}/>*/}
          <Box width="100%" display="flex" flexDirection="row" justifyContent="center"
          alignItems="center">
            <Box padding="2rem 2rem 0rem 0rem" width="472px">
              <PostsWidget userId={userId} isProfile={true} />
            </Box>
            <Box width="300px">
              <AdvertWidget />
            </Box>
          </Box>
        </Box>
      </Box>
    ) : (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return !isLoading ? (
      <Box>
        <Navbar />
        <Box
          widht="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          flexDirection={isNonMobileScreens ? "column" : "column"}
          gap="0.5rem"
          justifyContent="center"
          alignItems="center"
        >
          <Box width={isNonMobileScreens ? "70%" : undefined}>
            <UserWidget userId={userId} isNotProfile={false} />
          </Box>
          <Box
            width={isNonMobileScreens ? "60%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <PostsWidget userId={userId} isProfile={true} />
          </Box>
          {isNonMobileScreens && <Box width="15%"></Box>}
        </Box>
      </Box>
    ) : (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
};

export default ProfilePage;
