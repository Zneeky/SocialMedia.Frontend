import { Box, useMediaQuery, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

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

    const delay = 1000; // 2 second

    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  if (isLoading) {
    return (
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
    return (
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
    );
  }
};

export default ProfilePage;
