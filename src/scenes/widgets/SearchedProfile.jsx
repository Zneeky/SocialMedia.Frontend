import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfile } from "state";

const SearchedProfile = ({SearchedUserId, Name, ProfilePicture}) =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
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
      }else{
  
        const response = await fetch(`https://localhost:7172/api/users/${SearchedUserId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        });
  
        const data = await response.json();
        dispatch(
          setProfile({
            profile: data,
          },[])
        );
      }
    };
  
    return (
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={ProfilePicture} size="55px" />
          <Box
            onClick={() => {
              getProfile();
              navigate(`/profile/${SearchedUserId}`);
              navigate(0);
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {Name}
            </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>
    );
  };

export default SearchedProfile;