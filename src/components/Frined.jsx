import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfile } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userId = user.UserId;
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const border=palette.neutral.light;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const getProfile = async () => {
    if (friendId === userId) {
      dispatch(
        setProfile({
          profile: user,
        })
      );
    }else{

      const response = await fetch(`https://localhost:7172/api/users/${friendId}`, {
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
    <FlexBetween sx={{pl:"1.5rem", pr:"1.5rem"}}>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            getProfile();
            navigate(`/profile/${friendId}`);
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
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Friend;
