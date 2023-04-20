import{
    ManageAccountsOutlined,
    EditOutlined,
    LocationOutlined,
    WorkOutOutlined,
}from "@mui/icons-material";
import {Box, Typography, Divider, useTheme} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const UserWidget = ({userId, picturePath}) => {
    const [user,setUser]= useState(null);
    const {palette} = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token)
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`https://localhost:7172/api/users/${userId}`,{
            method:"GET",
            headers:{ Authorization: `Bearer ${token}`}
        })

        const data = await response.json();
        setUser(data);
    };

    useEffect(() =>{
        getUser();
    }, []) // eslint-disable-line  react-hooks/exhaustive-deps

    if(!user){
        return null;
    }
    
    const{
      username,
      country,
      birthDate,
      bio,
      followed,
      followers
    } = user

    return(
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
              gap="0.5rem"
              pb="1.1rem"
              onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                          variant="h4"
                          color={dark}
                          fontWeight="500"
                          sx={{
                            "&hover":{
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                          }}
                        >
                            {username}
                        </Typography>
                        <Typography color={medium}>Followers: {followers.length}</Typography>
                    </Box>
                    <ManageAccountsOutlined />
                </FlexBetween>

                <Divider />

                {/* SECOND ROW */}
                
            </FlexBetween>
        </WidgetWrapper>
    )
};
