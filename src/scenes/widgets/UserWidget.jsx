import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  FingerprintRounded,
  CakeOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [followText, setFollowText]=useState("");
  const [followers, setFollowers]= useState(0);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const profile = useSelector((state) => state.profile);
  const userIn = useSelector((state) => state.user);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const isEqual = userIn.UserId === userId;

  const getUser = async () => {
    console.log(profile)
    let toData={};
    if (isEqual) {
      const response = await fetch(
        `https://localhost:7172/api/users/${userIn.UserId}/widgets`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      toData=data;
      setUser(data);
    } else {
      const response = await fetch(
        `https://localhost:7172/api/users/${userId}/widgets`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      toData=data;
      setUser(data);

      //Check if following 
      const checkFollow= await axios.get(`https://localhost:7172/api/users/followings?userId=${userIn.UserId}&profileId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const checkFollowResponse=await checkFollow.data;
      if(checkFollowResponse===true){
        setFollowText("UNFOLLOW")
      }else{
        setFollowText("FOLLOW")
      }

          // Assuming the API response includes an array of followers
    }
    if (toData && toData.Followers) {
      const followersData = toData.Followers;
      setFollowers(followersData);
    } else {
      setFollowers(0); // Set default value if Followers property is missing
    }
  };

  const handleButtonFollow = async () =>{
    if (followText === "FOLLOW") {
      const follow = await axios.post(
        `https://localhost:7172/api/users/followings?userId=${userIn.UserId}&followedId=${userId}`,
        null, // Request body is null for a POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowers(followers+1);
      setFollowText("UNFOLLOW");
    } else {
      const unfollow = await axios.delete(
        `https://localhost:7172/api/users/followings?userId=${userIn.UserId}&followedId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFollowers(followers-1);
      setFollowText("FOLLOW");
    }
  }

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line  react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }
  //console.log(picturePath)
  const username = user.Name;
  const country = user.Country;
  const birthDate = user.DateOfBirth;
  const bio = user.Bio;
  let followed = user.Followed;


  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <UserImage image={user.ProfilePicture} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/profile/${userId}`)}
            >
              {username}
            </Typography>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <Typography color={medium}>{followers} Followers</Typography>
              <Typography color={medium}>{followed} Following</Typography>
            </Box>
          </Box>
        </FlexBetween>
        {isEqual ? (
          <ManageAccountsOutlined />
        ) : (
            <Button
            onClick={() => handleButtonFollow()}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "8px",
            }}
          >
            {followText}
          </Button>
        )}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{country}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <CakeOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium} mt="0.5rem">
            {birthDate}
          </Typography>
        </Box>
      </Box>
      <Divider />
      {/* THIRD ROW */}
      <Box p="1rem 0">
        <Box display="flex" gap="1rem">
          <FingerprintRounded fontSize="large" sx={{ color: main }} />
          <Typography>{bio}</Typography>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
