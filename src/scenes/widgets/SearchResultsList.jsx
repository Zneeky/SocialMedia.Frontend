import React from "react";
import { Box,useTheme,List } from "@mui/material";
import SearchedProfile from "./SearchedProfile";

const SearchResultsList = ({profileValues = []}) =>{

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return(
            <List 
             sx={{
              border:0,
              font:"inherit",
              fontSize:"100%",
              margin:"8px 0",
              p:"0",
              verticalAlign:"baseline",
              listStyleType:"none"
             }}
            >
                {profileValues.$values.map(
                 ({
                    Name,
                    ProfilePicture,
                    UserId,
                  }) => 
                  (
                    <SearchedProfile
                        key={UserId} 
                        SearchedUserId={UserId}
                        Name={Name}
                        ProfilePicture={ProfilePicture} 
                    />
                  )
                )}
            </List>
    )
}

export default SearchResultsList;