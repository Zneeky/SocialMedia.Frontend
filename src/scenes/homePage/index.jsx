import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget"
import PostsWidget from "scenes/widgets/PostsWidget";

const HomePage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const user = useSelector((state) => state.user);
    const userId = user?.UserId;
    const picturePath = user?.ProfilePicture;
    console.log(user)
    return(
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
                <UserWidget userId={userId} picturePath={picturePath}/>
            </Box>
            <Box 
                flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}
            >
                <MyPostWidget userId={userId} picturePath={picturePath}/>
                <PostsWidget userId={userId}/>
            </Box>
            {isNonMobileScreens && (
                <Box flexBasis="26%">
                    
                </Box>
            )}
        </Box>
    </Box>
    );
};

export default HomePage;