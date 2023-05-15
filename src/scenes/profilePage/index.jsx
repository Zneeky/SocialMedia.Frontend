import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`https://localhost:7172/api/users/${userId}`,{
        method:"GET",
        headers:{ Authorization: `Bearer ${token}`}
    })

    
    const data = await response.json();
    console.log(data)
    setUser(data);
};

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
    <Navbar/>
    <Box
        widht="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"    
    >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={userId} />
        </Box>
        <Box 
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
        >
            <PostsWidget userId={userId} isProfile={true}/>
        </Box>
        {isNonMobileScreens && (
            <Box flexBasis="26%">
                
            </Box>
        )}
    </Box>
</Box>
  );
};

export default ProfilePage;
