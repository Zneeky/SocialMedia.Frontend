import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  FingerprintRounded,
  CakeOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Button,
  Card,
  InputBase,
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/system";
import EditDialog from "components/EditDialog";

const Cover = styled("img")({
  width: "100%",
  height: 200,
  objectFit: "cover",
});

const AvatarWrapper = styled("div")({
  position: "absolute",
  top: 140,
  left: 8,
  zIndex: 1,
});

const Avatar = styled("img")({
  width: 80,
  height: 80,
  border: "2px solid white",
  borderRadius: "50%",
});

const Content = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const Title = styled(Typography)({
  fontSize: 24,
  fontWeight: "bold",
});

const Location = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
}));

const EditButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const UserWidget = ({ userId, isNotProfile = true }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [followText, setFollowText] = useState("");
  const [followers, setFollowers] = useState(0);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const profile = useSelector((state) => state.profile);
  const userIn = useSelector((state) => state.user);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const isEqual = userIn.UserId === userId;

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    // Save profile logic
    setEditMode(false);
  };

  const getUser = async () => {
    console.log(profile);
    let toData = {};
    if (isEqual) {
      const response = await fetch(
        `https://localhost:7172/api/users/${userIn.UserId}/widgets`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      toData = data;
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
      toData = data;
      setUser(data);

      //Check if following
      const checkFollow = await axios.get(
        `https://localhost:7172/api/users/followings?userId=${userIn.UserId}&profileId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const checkFollowResponse = await checkFollow.data;
      if (checkFollowResponse === true) {
        setFollowText("UNFOLLOW");
      } else {
        setFollowText("FOLLOW");
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

  const handleButtonFollow = async () => {
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
      setFollowers(followers + 1);
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
      setFollowers(followers - 1);
      setFollowText("FOLLOW");
    }
  };

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

  if (isNotProfile) {
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
            <Typography
              sx={{
                overflowWrap: "break-word",
                wordWrap: "break-word",
              }}
            >
              {bio}
            </Typography>
          </Box>
        </Box>
      </WidgetWrapper>
    );
  } else {
    return (
      <Card sx={{ position: "relative", overflow: "hidden", borderRadius: 1 }}>
        <Cover
          src={
            user.CoverPicture ||
            `https://www.creativefabrica.com/wp-content/uploads/2018/11/Wave-logo-by-Mansel-Brist-2.jpg`
          }
          alt="Cover"
        />
        <AvatarWrapper>
          <Avatar
            src={user.ProfilePicture}
            sx={{ border: `2px solid white` }}
          />
        </AvatarWrapper>
        <Content>
          <Header>
            {!editMode ? (
              <Box display="flex" gap="1rem">
                <Title variant="h6">{user.Name}</Title>
                {!isEqual && (
                  <Button
                    onClick={() => handleButtonFollow()}
                    sx={{
                      color: palette.background.alt,
                      backgroundColor: palette.primary.main,
                      borderRadius: "8px",
                      height: "30%",
                    }}
                  >
                    {followText}
                  </Button>
                )}
              </Box>
            ) : (
              <InputBase
                type="text"
                className="border py-2 px-3 rounded-md"
                placeholder="Your name"
                value={username}
                //onChange={(ev) => setName(ev.target.value)}
              />
            )}

            {isEqual && (
              <EditButton onClick={handleEditProfile}>
                {editMode ? "Edit Profile" : "Edit Profile"}
              </EditButton>
            )}
            {editMode && (
              <EditDialog
                open={editMode}
                handleClose={() => setEditMode(false)}
                user={user}
                userId={userIn.UserId}
                token={token}
              />
            )}
          </Header>
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <Typography color={medium}>{followers} Followers</Typography>
            <Typography color={medium}>{followed} Following</Typography>
          </Box>
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
          {/* Additional content */}
        </Content>
      </Card>
    );
  }
};

export default UserWidget;
