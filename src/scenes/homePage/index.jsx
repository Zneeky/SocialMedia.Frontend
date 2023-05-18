import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget"
import PostsWidget from "scenes/widgets/PostsWidget";
import { setProfile } from "state";
import { useEffect } from "react";

const HomePage = () => {

    const dispatch= useDispatch();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const user = useSelector((state) => state.user);
    const profile = useSelector((state) => state.user);
    const {palette} = useTheme();
    const userId = user?.UserId;
    const picturePath = user?.ProfilePicture;

    useEffect(() => {
        dispatch(
            setProfile({
              profile: profile,
            })
          );
      }, []);
 
    const profil= useSelector((state) =>state.profile)
    console.log(profil)
    return(
    <Box>
        <Navbar/>
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
            backgroundColor={palette.background.alt}
        >
          {isNonMobileScreens && (
                <Box flexBasis="26%">
                    
                </Box>
            )}
            <Box 
                flexBasis={isNonMobileScreens ? "42%" : "10%"}
                mt={isNonMobileScreens ? undefined : "2rem"}
            >
                <MyPostWidget userId={userId} picturePath={picturePath}/>
                <PostsWidget userId={userId}/>
            </Box>
            <Box flexBasis={isNonMobileScreens ? "26%" : "40%"}   
            >
                <UserWidget userId={userId} />
            </Box>
        </Box>
    </Box>
    );
};

export default HomePage;